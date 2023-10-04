export interface Todo {
    id: number | null;
    title: string | null;
    completed: boolean | null;
}
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url); // Getting search parameters i.e: http://url?parameter=0
    const validSearchParams = searchParams.get("id");
    const url = "https://jsonplaceholder.typicode.com/todos/";

    const res = await fetch(url + (validSearchParams ? validSearchParams: ""), {cache: "no-cache"})
    const todos = await res.json();
    return Response.json(todos);
}