import ky from 'ky';
/* import { useToast } from 'vue-toastification';
const toast = useToast();
 */
interface HttpFunctionPayload {
    route: string;
    url?: any;
    body?: any;
    data?: Array<any>;
    transform?: any;
}

const baseURL = `http://localhost:3002/api`;

const api = ky.extend({
    /* prefixUrl: '', */
    timeout: false,
    headers: {
        /* 'Content-Type': 'application/json', */
        "Access-Control-Allow-Origin": "*",
    },
    hooks: {
        beforeRequest: [
            request => {
                const token = localStorage.getItem('token');
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            },
        ],
    },
});

const toFormData = (obj: any) => {
    const formData = new FormData();
    function appendFormData(data: any, rootKey: any) {
        if (Array.isArray(data)) {
            data.forEach((value, index) => {
                appendFormData(value, `${rootKey}[${index}]`);
            });
        } else if (typeof data === 'object' && data !== null && !(data instanceof File)) {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    if (rootKey === "") {
                        appendFormData(data[key], key);
                    } else {
                        appendFormData(data[key], `${rootKey}[${key}]`);
                    }
                }
            }
        } else {
            if (data !== null) {
                formData.append(rootKey, data);
            }
        }
    }
    appendFormData(obj, "");
    return formData;
}

const toURLEndpoint = (route: string, newURL: string) => {
    return route && !newURL ? `${baseURL}/${route}` : newURL;
}



const toReadableResponse = async (type: string, body: any) => {
    if (type === 'complete') {
        return {
            success: true,
            message: body.message,
            data: body.data
        };
    }
    const error = await body.response.json();
    if (error) {
        return error;
    }
    return {
        success: false,
        message: "Server error!"
    }
}

const toURLSearchParams = (payload: any): string => {
    const queries: any = [];
    Object.keys(payload).forEach((key) => {
        const value = payload[key];
        if (Array.isArray(value)) {
            if (value) {
                value.forEach((val, index) => {
                    queries.push(`${key}[${index}]=${encodeURIComponent(val.toString()).replace(/%20/g, "+")}`);
                });
            }
        } else if (value !== null && value !== undefined) {
            queries.push(`${key}=${encodeURIComponent(value.toString()).replace(/%20/g, "+")}`);
        }
    });
    return queries.join("&");
};


const apiClient = {
    get: async ({ route, url }: HttpFunctionPayload) => {
        return await api.get(toURLEndpoint(route, url)).json();
    },
    post: async ({ route, url, body, transform }: HttpFunctionPayload) => {
        if (transform && transform === 'form-data') {
            return await api.post(toURLEndpoint(route, url), {
                body: toFormData(body)
            }).json();
        }
        return await api.post(toURLEndpoint(route, url), {
            json: body
        }).json();
    },

    put: async ({ route, url, body, transform }: HttpFunctionPayload) => {
        if (transform && transform === 'form-data') {
            return await api.put(toURLEndpoint(route, url), {
                body: toFormData(body)
            })
                .json();
        }
        return await api.put(toURLEndpoint(route, url), {
            json: body
        }).json();
    },
    delete: async ({ route, url, body }: HttpFunctionPayload) => {
        return await api.delete(toURLEndpoint(route, url), {
            json: body,
        })
            .json();
    },
    toURLSearchParams,
    toReadableResponse,
}

export default apiClient;
