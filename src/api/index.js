import ajax from "./ajax";

export const reqLogin = (loginObj)=> ajax.post('http://localhost:3000/login', loginObj)