'use client';

import React from "react";

export default function useSessionStorage<TData>(key: string, intialValue: string) {
    const state = React.useState<TData>(() => {
        const stored = sessionStorage.getItem(key);
        return stored ? JSON.parse(stored) : intialValue;
    })

    React.useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(state[0]));
    }, [state[0]])

    return state;
}