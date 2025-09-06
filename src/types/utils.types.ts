import { ReactNode } from 'react';

export type THTTPmethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export type TRequestPayload = {
    method: THTTPmethod
    headers?: Record<string, string>
    body?: string
}

export interface IModalProps {
    children: ReactNode | Array<ReactNode>
    closeModal: () => void
}
