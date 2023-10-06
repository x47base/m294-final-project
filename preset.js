class FetchPreset{
    constructor(){

    }
    async get(url, response_type){
        /*
            Example: preset.get('http://localhost/tasks', 'json')
        */
        try {
            const response = await fetch(url,{
                method: 'GET'
            })
    
            if(!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
    
            if(response_type === 'json'){
                const data_json = response.json()
                return data_json
            } else if (response_type === 'text'){
                const data_text = response.text()
                return data_text
            } else if (response_type === 'status'){
                return response.status 
            }
        } catch(err){
            console.warn(`Error: ${err}`)
        }
    }
    
    async post_body(url, data, response_type){
        /*
            Example: preset.post_body('http://localhost/tasks', { email: 'example@gmail.com', password: 'm294' }, 'json')
        */
        try {
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
    
            if(!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
    
            if(response_type === 'json'){
                const data_json = response.json()
                return data_json
            } else if (response_type === 'text'){
                const data_text = response.text()
                return data_text
            } else if (response_type === 'status'){
                return response.status 
            }
        } catch(err){
            console.warn(`Error: ${err}`)
        }
    }
    
    async put_body(url, data, response_type){
        /*
            Example: preset.put_body('http://localhost/tasks', { id: 1, title: 'work', completed: false }, 'json')
        */
        try {
            const response = await fetch(url,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
    
            if(!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
    
            if(response_type === 'json'){
                const data_json = response.json()
                return data_json
            } else if (response_type === 'text'){
                const data_text = response.text()
                return data_text
            } else if (response_type === 'status'){
                return response.status 
            }
        } catch(err){
            console.warn(`Error: ${err}`)
        }
    }
    
    async delete(url, response_type){
        /*
            Example: preset.delete('http://localhost/task/:taskId')
        */
        try {
            const response = await fetch(url,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
    
            if(!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
    
            if(response_type === 'json'){
                const data_json = response.json()
                return data_json
            } else if (response_type === 'text'){
                const data_text = response.text()
                return data_text
            } else if (response_type === 'status'){
                return response.status 
            }
        } catch(err){
            console.warn(`Error: ${err}`)
        }
    }
    
}

/* Examples:

presets.get('http://localhost/tasks', 'json')
presets.post_body('http://localhost/tasks', { email: 'example@gmail.com', password: 'm294' }, 'json')
presets.put_body('http://localhost/tasks', { id: 1, title: 'work', completed: false }, 'json')
presets.delete('http://localhost/task/:taskId')

*/

const fetch_components = new FetchPreset();
const data = fetch_components.get('http://localhost/tasks','json')
console.log(data)
