import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const InputField = ({ 
  onSubmit, 
  placeholder = "Digite sua resposta...", 
  type = "text",
  disabled = false,
  options = null 
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleOptionClick = (option) => {
    onSubmit(option);
  };

  if (options) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        {options.map((option, index) => (
          <motion.div
            key={option}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              onClick={() => handleOptionClick(option)}
              variant="outline"
              className="w-full justify-start text-left h-auto py-3 px-4 hover:bg-blue-50 hover:border-blue-300"
              disabled={disabled}
            >
              {option}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="flex gap-2"
    >
      <Input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1"
        autoFocus
      />
      <Button 
        type="submit" 
        disabled={!value.trim() || disabled}
        className="px-3"
      >
        <Send className="w-4 h-4" />
      </Button>
    </motion.form>
  );
};

export default InputField;

