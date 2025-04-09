/// <reference types="vite/client" />
import "csstype"; // Ensure this is installed (`npm install --save-dev @types/csstype`)

interface musicItem {
  id: number;
  title: string;
  thumbnail: string;
  musicUrl: string;
  artistName: string;
  duration: number;
  bg1: string;
  bg2: string;
}

declare module "csstype" {
  interface Properties {
    // Add your custom properties here
    "--background-size"?: string;
    "--bg-1"?: string;
    "--bg-2"?: string;
    // Add more custom properties as needed
  }
}
