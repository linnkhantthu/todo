export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    if(searchParams){
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/"+ searchParams.get("id"), {cache: "no-cache"});      
        const todos: Todo[] = await res.json();
        return Response.json(todos);
    }
    else{
        const res = await fetch("https://jsonplaceholder.typicode.com/todos", {cache: "no-cache"});
        const todos: Todo[] = await res.json();
        return Response.json(todos);
    }
    
  
}