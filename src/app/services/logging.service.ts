import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

export enum LogLevel {
    Info = 'INFO',
    Warning = 'WARNING',
    Error = 'ERROR'
}

export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    action: string;
    userId?: string;
    details?: any;
}

@Injectable({
    providedIn: 'root'
})
export class LoggingService {
    private logs: LogEntry[] = [];
    private readonly MAX_LOGS = 1000;

    private createLogEntry(level: LogLevel, action: string, user?: User | null, details?: any): LogEntry {
        return {
            timestamp: new Date().toISOString(),
            level,
            action,
            userId: user?.id,
            details
        };
    }

    private addLog(entry: LogEntry): void {
        this.logs.unshift(entry);
        if (this.logs.length > this.MAX_LOGS) {
            this.logs.pop();
        }
        console.log(`[${entry.level}] ${entry.action}`, {
            timestamp: entry.timestamp,
            userId: entry.userId,
            details: entry.details
        });
    }

    info(action: string, user?: User | null, details?: any): void {
        const entry = this.createLogEntry(LogLevel.Info, action, user, details);
        this.addLog(entry);
    }

    warning(action: string, user?: User | null, details?: any): void {
        const entry = this.createLogEntry(LogLevel.Warning, action, user, details);
        this.addLog(entry);
    }

    error(action: string, user?: User | null, details?: any): void {
        const entry = this.createLogEntry(LogLevel.Error, action, user, details);
        this.addLog(entry);
    }

    getLogs(): LogEntry[] {
        return [...this.logs];
    }

    clearLogs(): void {
        this.logs = [];
        console.log('Logs limpos');
    }
}