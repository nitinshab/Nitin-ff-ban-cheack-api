// api/index.js
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { uid } = req.query;
  if (!uid) {
    return res.status(400).json({
      status: 'ERROR',
      error: 'Missing uid parameter',
      dev: '@FizzaGirl',
      owner: '@FizzaGirl',
      channel: '@BUILDAPIS',
      credit: 'Abhi bhai'
    });
  }

  try {
    // ✅ Working upstream API
    const upstream = `https://abhi-ban-check-api.vercel.app/bancheck?uid=${uid}`;

    const response = await fetch(upstream);
    if (!response.ok) throw new Error(`Upstream ${response.status}`);

    const data = await response.json();

    // 🔥 Branding override
    data.dev = '@FizzaGirl';
    data.owner = '@FizzaGirl';
    data.channel = '@BUILDAPIS';
    data.credit = 'Abhi bhai';

    // Extra fields साफ करो
    ['developer', 'author', 'creator', 'by', 'tg', 'telegram'].forEach(f => {
      if (f in data) delete data[f];
    });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      status: 'ERROR',
      is_banned: false,
      ban_period: 0,
      nickname: '',
      uid: uid,
      AccountLevel: 0,
      region: '',
      likes: 0,
      AccountLastLogin: '0',
      dev: '@FizzaGirl',
      owner: '@FizzaGirl',
      channel: '@BUILDAPIS',
      credit: 'Abhi bhai',
      error: err.message || 'Internal server error'
    });
  }
      }
