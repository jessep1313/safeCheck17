import { LucideIcon } from 'lucide-react';
import { FormEvent } from 'react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    icon?: LucideIcon;
    title: string;
    items: NavItem[];
}

export type NavItem = {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    childs?: undefined;
} | {
    title: string;
    href?: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    childs: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Session {
    id: string;
    ip_address: string;
    user_agent: string;
    last_activity: number;
    last_activity_human: string;
    is_current: boolean;
}

export interface SelectOption {
    label: string;
    value?: string;
    childs?: SelectOption[];
}

export interface CatalogItem {
    id: string;
    name: string;
}

export interface EventSubmit extends FormEvent<HTMLFormElement> { }
