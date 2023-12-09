
export async function GET() {
    return Response.json({ "status": "ok" })
}

export async function POST(request) {

    const body = await request.json()

    const response = await fetch(`https://bjcl4zsidb.execute-api.ap-southeast-1.amazonaws.com/stage/wallet`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const json = await response.json();
    return Response.json({ ...json })
}
