// lib/gsb.ts
import axios from 'axios';
import { GSBThreat } from './types';

const GSB_API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
const GSB_API_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

export async function checkGoogleSafeBrowsing(
  url: string
): Promise<GSBThreat[]> {
  if (!GSB_API_KEY) {
    throw new Error('GSB API key is not configured.');
  }

  try {
    const response = await axios.post(
      `${GSB_API_URL}?key=${GSB_API_KEY}`,
      {
        client: { clientId: 'score-url-project', clientVersion: '1.0.0' },
        threatInfo: {
          threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'PHISHING'],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url: url }],
        },
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.data.matches && response.data.matches.length > 0) {
      return response.data.matches.map((match: any) => ({
        threatType: match.threatType,
      })) as GSBThreat[];
    }
    return [];
  } catch (error: any) {
    console.error('GSB API call failed:', error.message);
    throw new Error('Failed to connect to Google Safe Browsing API.');
  }
}
