import React from 'react';
import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface PasswordStrength {
  label: string;
  value: number;
  color: 'error' | 'warning' | 'success';
}

interface Props {
  show: boolean;
  password: string;
  strength: PasswordStrength;
}

const PasswordStrengthHint: React.FC<Props> = ({ show, password, strength }) => (
  <AnimatePresence>
    {show && password && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Box sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: (theme) => theme.palette[strength.color].main,
              }}
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
                background: (theme) => {
                  if (strength.color === 'error') return theme.palette.error.main;
                  if (strength.color === 'warning') return 'linear-gradient(to right, #FF9800, #FFC107)';
                  return 'linear-gradient(to right, #43a047, #66bb6a)';
                },
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

export default PasswordStrengthHint;
