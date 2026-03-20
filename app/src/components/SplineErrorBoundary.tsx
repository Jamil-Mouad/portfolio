import { Component, type ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  onChatOpen?: () => void;
}

interface State {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ig-border/10 to-ig-bg rounded-2xl min-h-[300px]">
          <motion.button
            onClick={this.props.onChatOpen}
            className="flex flex-col items-center gap-4 p-8 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-ig-text to-ig-text-secondary flex items-center justify-center shadow-clay"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MessageCircle className="w-10 h-10 text-white" />
            </motion.div>
            <p className="text-sm text-ig-text-secondary font-medium">Chat with AI</p>
          </motion.button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default SplineErrorBoundary;
