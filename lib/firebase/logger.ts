type LogLevel = 'info' | 'warn' | 'error';

interface LogMessage {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

class FirebaseLogger {
  private static instance: FirebaseLogger;
  private readonly isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  static getInstance(): FirebaseLogger {
    if (!FirebaseLogger.instance) {
      FirebaseLogger.instance = new FirebaseLogger();
    }
    return FirebaseLogger.instance;
  }

  private formatLog(level: LogLevel, message: string, data?: any): LogMessage {
    return {
      level,
      message,
      data: this.sanitizeData(data),
      timestamp: new Date().toISOString(),
    };
  }

  private sanitizeData(data: any): any {
    if (!data) return undefined;
    
    // Create a deep copy to avoid modifying the original
    const sanitized = JSON.parse(JSON.stringify(data));
    
    // Remove sensitive fields
    const sensitiveFields = ['password', 'securityAnswer', 'token'];
    
    const removeSensitive = (obj: any) => {
      if (typeof obj !== 'object') return;
      
      Object.keys(obj).forEach(key => {
        if (sensitiveFields.includes(key)) {
          obj[key] = '[REDACTED]';
        } else if (typeof obj[key] === 'object') {
          removeSensitive(obj[key]);
        }
      });
    };

    removeSensitive(sanitized);
    return sanitized;
  }

  info(message: string, data?: any) {
    const log = this.formatLog('info', message, data);
    if (this.isDevelopment) {
      console.log(`[${log.timestamp}] INFO:`, log.message, log.data || '');
    }
    return log;
  }

  warn(message: string, data?: any) {
    const log = this.formatLog('warn', message, data);
    if (this.isDevelopment) {
      console.warn(`[${log.timestamp}] WARN:`, log.message, log.data || '');
    }
    return log;
  }

  error(message: string, error?: any) {
    const log = this.formatLog('error', message, {
      message: error?.message,
      code: error?.code,
      stack: this.isDevelopment ? error?.stack : undefined,
    });
    
    if (this.isDevelopment) {
      console.error(`[${log.timestamp}] ERROR:`, log.message, log.data || '');
    }
    return log;
  }
}

export const firebaseLogger = FirebaseLogger.getInstance();