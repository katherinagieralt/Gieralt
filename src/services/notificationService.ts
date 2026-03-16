/**
 * Service for external notifications (Slack, Discord, etc.)
 */

export async function sendExternalNotification(type: 'slack' | 'discord', payload: any) {
  const webhookUrl = type === 'slack' ? process.env.SLACK_WEBHOOK_URL : process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log(`[SIMULATION] Sending ${type} notification:`, payload);
    return true;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return response.ok;
  } catch (error) {
    console.error(`Error sending ${type} notification:`, error);
    return false;
  }
}

export function formatSlackLeadNotification(lead: any) {
  return {
    text: `🚀 *Nowy Lead!* \n*Klient:* ${lead.name}\n*Email:* ${lead.email}\n*Budżet:* ${lead.budget}\n*Wiadomość:* ${lead.message}`,
    attachments: [
      {
        color: lead.aiInsights?.score > 70 ? "#10b981" : "#f59e0b",
        fields: [
          { title: "AI Score", value: `${lead.aiInsights?.score}/100`, short: true },
          { title: "Intent", value: lead.aiInsights?.intent, short: true }
        ]
      }
    ]
  };
}
