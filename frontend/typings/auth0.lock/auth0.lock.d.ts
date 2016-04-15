﻿// Type definitions for Auth0Widget.js
// Project: http://auth0.com
// Definitions by: Robert McLaws <https://github.com/advancedrei>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../auth0/auth0.d.ts" />

interface Auth0LockPopupOptions {
    width: number;
    height: number;
    left: number;
    top: number;
}

interface Auth0LockOptions {
    authParams?: any;
    callbackURL?: string;
    connections?: string[];
    container?: string;
    closable?: boolean;
    dict?: any;
    defaultUserPasswordConnection?: string;
    defaultADUsernameFromEmailPrefix?: boolean;
    disableResetAction?: boolean;
    disableSignupAction?: boolean;
    focusInput?: boolean;
    forceJSONP?: boolean;
    gravatar?: boolean;
    integratedWindowsLogin?: boolean;
    icon?: string;
    loginAfterSignup?: boolean;
    popup?: boolean;
    popupOptions?: Auth0LockPopupOptions;
    rememberLastLogin?: boolean;
    resetLink?: string;
    responseType?: string;
    signupLink?: string;
    socialBigButtons?: boolean;
    sso?: boolean;
    theme?: string;
    usernameStyle?: any;
}

interface Auth0LockConstructorOptions {
    cdn?: string;
    assetsUrl?: string;
    useCordovaSocialPlugins?: boolean;
}

interface Auth0LockStatic {
    new (clientId: string, domain: string, options?: Auth0LockConstructorOptions): Auth0LockStatic;

    show(): void;
    show(options: Auth0LockOptions): void;
    show(callback: (error?: Auth0Error, profile?: Auth0UserProfile, token?: string) => void) : void;
    show(options: Auth0LockOptions, callback: (error?: Auth0Error, profile?: Auth0UserProfile, token?: string) => void) : void;

    showSignin(): void;
    showSignin(options: Auth0LockOptions): void;
    showSignin(callback: (error?: Auth0Error, profile?: Auth0UserProfile, token?: string) => void) : void;
    showSignin(options: Auth0LockOptions, callback: (error?: Auth0Error, profile?: Auth0UserProfile, token?: string) => void) : void;

    showSignup(): void;
    showSignup(options: Auth0LockOptions): void;
    showSignup(callback: (error?: Auth0Error) => void) : void;
    showSignup(options: Auth0LockOptions, callback: (error?: Auth0Error) => void) : void;

    showReset(): void;
    showReset(options: Auth0LockOptions): void;
    showReset(callback: (error?: Auth0Error) => void) : void;
    showReset(options: Auth0LockOptions, callback: (error?: Auth0Error) => void) : void;

    hide(callback: () => void): void;
    logout(options: any): void;

    parseHash(hash: string): any;
    getProfile(id_token: string, callback: Callback): any;
}

interface Callback {
    (err: any, profile: any): any;
}

declare var Auth0Lock: Auth0LockStatic;

declare module "auth0-lock" {
    export = Auth0Lock;
}
