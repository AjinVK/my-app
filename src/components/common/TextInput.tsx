import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  error: string;
  type?: string;
  helperText?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  isPasswordField?: boolean;
  iconButtonClassName?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onCopy?: (e: React.ClipboardEvent<HTMLInputElement>) => void; 
  onCut?: (e: React.ClipboardEvent<HTMLInputElement>) => void; 
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  error,
  onChange,
  showPassword,
  setShowPassword,
  type = 'text',
  className = "",
  disabled = false,
  iconButtonClassName,
  helperText,
  onFocus,
  onBlur,
  onCopy,
  onCut
}) => {
  const isPasswordField = type === 'password';
  const handlePreventCopyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (isPasswordField) {
      e.preventDefault();
    }
  };

  return (
    <TextField
      label={label}
      name={name}
      type={isPasswordField && showPassword !== undefined ? (showPassword ? 'text' : 'password') : type}
      variant="standard"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText || error}
      fullWidth
      required
      className={className}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      onCopy={onCopy}
      onPaste={onCut}
      onCut={handlePreventCopyPaste}
      InputProps={
        isPasswordField && setShowPassword
          ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} className={iconButtonClassName}>
                  {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </IconButton>
              </InputAdornment>
            ),
          }
          : undefined
      }
      sx={{ mb: 2 }} 
    />
  );
};

export default TextInput;
