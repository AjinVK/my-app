import React, { createContext, useContext, useState } from 'react';
import { Alert, Slide, Box, type SlideProps } from '@mui/material';

type SnackbarItem = {
    id: number;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
    open: boolean;
};

const SnackbarContext = createContext<{ showSnackbar: (msg: string, severity?: SnackbarItem['severity']) => void }>({
    showSnackbar: () => { },
});

const SlideTransition = (props: SlideProps) => (
    <Slide {...props} direction="down" timeout={{ enter: 300, exit: 300 }} />
);

let snackbarId = 0;
const MAX_SNACKBARS = 3;
const DISPLAY_TIME = 2000;

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

    const showSnackbar = (message: string, severity: SnackbarItem['severity'] = 'info') => {
        const isDuplicate = snackbars.some((s) => s.message === message && s.severity === severity);
        if (isDuplicate) return;

        const id = snackbarId++;
        const newSnack: SnackbarItem = { id, message, severity, open: true };

        setSnackbars((prev) => {
            const updated = [...prev, newSnack];
            return updated.slice(-MAX_SNACKBARS);
        });

        setTimeout(() => {
            setSnackbars((prev) =>
                prev.map((s) => (s.id === id ? { ...s, open: false } : s))
            );
        }, DISPLAY_TIME);

        setTimeout(() => {
            setSnackbars((prev) => prev.filter((s) => s.id !== id));
        }, DISPLAY_TIME + 600);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}

            <Box style={{ position: 'fixed', top: 16, left: 0, right: 0, zIndex: 1500 }}>
                {snackbars.map((snack, index) => (
                    <div
                        key={snack.id}
                        style={{
                            marginTop: index === 0 ? 0 : 6,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <SlideTransition in={snack.open} direction="down" timeout={{ enter: 300, exit: 600 }}>
                            <Alert severity={snack.severity} sx={{ width: 'fit-content', minWidth: 300 }}>
                                {snack.message}
                            </Alert>
                        </SlideTransition>
                    </div>
                ))}
            </Box>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => useContext(SnackbarContext);
