import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from 'fs'
import { join } from 'path'

const baseFolder =
    process.env.APPDATA !== undefined && process.env.APPDATA !== ''
        ? `${process.env.APPDATA}/ASP.NET/https`
        : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg ? certificateArg.groups.value : "RaceEntry.ClientApp";

if (!certificateName) {
    console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
    process.exit(-1);
}

const certFilePath = join(baseFolder, `${certificateName}.pem`);
const keyFilePath = join(baseFolder, `${certificateName}.key`);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server:{
        https: {
            key: readFileSync(keyFilePath),
            cert: readFileSync(certFilePath),
        },
        host: true,
        port: 5002,
        proxy: {
            '/api': {
                target: 'https://localhost:7256',
                changeOrigin: true,
                secure: false,
            },
        },
        // proxy: {
        //     '/api': {
        //         target: 'https://web.focusline.com.tw',
        //         changeOrigin: true,
        //         secure: false,
        //     },
        // }
    }

})