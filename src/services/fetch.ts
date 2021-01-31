interface HttpResponse<T> extends Response {
    parsedBody?: {
        success: boolean;
        data: T
    };
}

const _TOKEN = localStorage.getItem('token');

export const httpFetch = {
    post: async <T>(url: string, body: unknown): Promise<HttpResponse<T>> => {
        const response: HttpResponse<T> = await fetch(
            url,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${_TOKEN}`
                },
                body: JSON.stringify(body)
            }
        )
        response.parsedBody = await response.json();
        return response;
    },
    get: async <T>(url: string) : Promise<HttpResponse<T>> => {
        const response: HttpResponse<T> = await fetch(
            url,
            {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `${_TOKEN}`
                },
            }
        )
        response.parsedBody = await response.json();
        return response;
    },
    put: async <T>(url: string, body: unknown): Promise<HttpResponse<T>> => {
        const response: HttpResponse<T> = await fetch(url, {
            method: 'PUT',
            mode: "cors",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `${_TOKEN}`
            },
            body: JSON.stringify(body)
        })
        response.parsedBody = await response.json();
        return response;
    }
}