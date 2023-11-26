import {google} from "googleapis";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)
    const nextToken = searchParams.get('nextToken')

    const auth = new google.auth.GoogleAuth({
        keyFile: "./src/" + process.env.DRIVE_KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/drive.metadata.readonly',
            'https://www.googleapis.com/auth/drive.metadata'],
    });

    const drive = google.drive({
        version: 'v3',
        auth,
    });

       try {
        const res = await drive.files.list({
            pageSize: 100,
            q: "mimeType != 'application/vnd.google-apps.folder'",
            pageToken: nextToken == null ? "" : nextToken,
            fields:'*'
        });
        return Response.json(res.data);
    } catch (err:any) {
        console.log(err.message);
        return Response.error();
    }
}