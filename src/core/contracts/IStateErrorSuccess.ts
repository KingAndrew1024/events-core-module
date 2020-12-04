
export interface IEventsStateError {
    after: 'GET' | 'CREATE' | 'UPDATE' | 'DELETE' | 'UNKNOWN';
    error: any;
}

export interface IEventsStateSuccess {
    after: 'GET' | 'CREATE' | 'UPDATE' | 'DELETE' | 'UNKNOWN';
    data?: any;
}
