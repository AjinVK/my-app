import React, { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  show: boolean;
  password: string;
  strength: {
    label: string;
    value: number;
    color: 'error' | 'warning' | 'success';
  };
  onClose: () => void;
  autoHideDuration?: number;
}

const PasswordStrengthSnackbar: React.FC<Props> = ({ show, password, strength, onClose, autoHideDuration = 3000 }) => {
  const theme = useTheme();

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [show, autoHideDuration, onClose]);

  return (
    <AnimatePresence>
      {show && password && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 10,
            minWidth: 320,
            backgroundColor: '#fff',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            borderRadius: 8,
            padding: '1rem',
            marginTop: 8
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: theme.palette[strength.color].main }}
              >
                Strength: {strength.label}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                {strength.value}%
              </Typography>
            </Box>

            <Box
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#e0e0e0',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${strength.value}%`,
                  background:
                    strength.color === 'error'
                      ? theme.palette.error.main
                      : strength.color === 'warning'
                        ? 'linear-gradient(to right, #FF9800, #FFC107)'
                        : 'linear-gradient(to right, #43a047, #66bb6a)',
                  transition: 'width 0.3s ease-in-out',
                }}
              />
            </Box>

            <Box sx={{ mt: 1 }}>
              {[
                { label: 'At least 8 characters', valid: password.length >= 8 },
                { label: 'One number', valid: /\d/.test(password) },
                { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
                { label: 'One special character', valid: /[^A-Za-z0-9]/.test(password) },
              ].map((rule, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  {rule.valid ? (
                    <CheckIcon fontSize="small" color="success" />
                  ) : (
                    <CloseIcon fontSize="small" color="disabled" />
                  )}
                  <Typography
                    variant="caption"
                    sx={{ ml: 1, color: rule.valid ? 'success.main' : 'text.secondary' }}
                  >
                    {rule.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordStrengthSnackbar;

