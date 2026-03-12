/**
 * SMTP Verification Script (Updated)
 * 
 * This script verifies the SMTP connection health using the centralized 
 * Params module and the EmailService.
 */

import { emailService } from "../src/lib/EmailService";
import { Params } from "../src/lib/Params";
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local to ensure environment variables are available for the test
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function verifySMTP() {
    console.log('--- SMTP Configuration Verification ---');
    console.log('Source of Truth: Params Module');
    console.log('Host:    ', Params.smtp.host);
    console.log('Port:    ', Params.smtp.port);
    console.log('Secure:  ', Params.smtp.secure);
    console.log('User:    ', Params.smtp.auth.user ? '***' : '(Not Set)');
    console.log('From:    ', Params.smtp.from);
    console.log('To:      ', Params.contact.recipientEmail);
    console.log('---------------------------------------');

    try {
        console.log('Connecting to SMTP server...');
        await emailService.verifyConnection();
        console.log('✅ Success: SMTP connection established successfully!');
    } catch (error) {
        console.error('❌ Error: SMTP connection failed:');
        console.error(error);
        process.exit(1);
    }
}

verifySMTP();
