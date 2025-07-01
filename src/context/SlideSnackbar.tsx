// import React from 'react';
// import { Snackbar, Alert, Slide, type SlideProps, type SnackbarCloseReason } from '@mui/material';

// const SlideTransition = (props: SlideProps) => {
//   return <Slide {...props} direction="down" />;
// }

// interface SlideSnackbarProps {
//   open: boolean;
//   message: string;
//     onClose: (
//     event?: React.SyntheticEvent | Event,
//     reason?: SnackbarCloseReason
//   ) => void;
//   severity?: 'error' | 'success' | 'info' | 'warning';
//   autoHideDuration?: number;
// }

// const SlideSnackbar: React.FC<SlideSnackbarProps> = ({
//   open,
//   message,
//   severity = 'info',
//   onClose,
//   autoHideDuration = 1500,
// }) => {
//   return (
//     <Snackbar
//       open={open}
//       onClose={onClose}
//       autoHideDuration={autoHideDuration}
//       TransitionComponent={SlideTransition}
//       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//     >
//       <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
//         {message}
//       </Alert>
//     </Snackbar>
//   );
// };

// export default SlideSnackbar;
