import {google} from 'googleapis';

export async function getAllDogeDrive(nextToken: string|null|undefined) {
    const auth = new google.auth.GoogleAuth({
        keyFile: "./src/" + process.env.DRIVE_KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({
        version: 'v3',
        auth,
    });

    try {
        const res = await drive.files.list({
            pageSize: 5,
            q: "mimeType != 'application/vnd.google-apps.folder'",
            pageToken: nextToken == null ? "" : nextToken,
        });
        console.log(res);
        return res.data;
    } catch (ex: any) {
        console.log(ex.message);
        return {};
    }

}