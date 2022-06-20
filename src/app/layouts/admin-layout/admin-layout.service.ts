import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class AdminLayoutService {
    isSidebarOpen: boolean | null = null;
    currentComponent: "Main Dashboard" | "Masterlist" | "" = "";
    view: "mobile" | "tablet" | "desktop" | null = null
}