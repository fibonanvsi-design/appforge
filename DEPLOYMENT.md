# Deployment Guide - AppForge ke Vercel

Panduan lengkap untuk deploy AppForge ke Vercel.

## Prerequisites

1. **Akun Vercel** - Daftar di [vercel.com](https://vercel.com)
2. **Database PostgreSQL** - Pilih salah satu:
   - Vercel Postgres
   - Supabase (recommended)
   - Neon
   - Railway
3. **Vercel CLI** (optional) - `npm install -g vercel`

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended untuk pemula)

1. **Fork repository ini ke GitHub**

2. **Buat database PostgreSQL:**
   - Pergi ke [Supabase](https://supabase.com) atau [Neon](https://neon.tech)
   - Buat project baru
   - Copy connection string (format: `postgresql://...`)

3. **Deploy ke Vercel:**
   - Buka [vercel.com/new](https://vercel.com/new)
   - Import repository dari GitHub
   - Klik "Import"
   
4. **Configure Environment Variables:**
   ```
   DATABASE_URL=your_postgresql_connection_string
   NEXTAUTH_SECRET=generate_random_32_char_string
   NEXTAUTH_URL=https://your-app.vercel.app
   ```
   
   Untuk generate NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```

5. **Klik "Deploy"**

6. **Run database migrations:**
   - Buka terminal di Vercel dashboard atau lokal
   - Pull env variables: `vercel env pull .env`
   - Run: `npx prisma migrate deploy`

### Option 2: Deploy via Vercel CLI

```bash
# 1. Login ke Vercel
vercel login

# 2. Link project
vercel link

# 3. Add environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL

# 4. Deploy
vercel --prod

# 5. Run migrations
vercel env pull .env
npx prisma migrate deploy
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | Secret key for JWT (min 32 chars) | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app URL | `https://appforge.vercel.app` |

## Database Setup

### Using Supabase (Recommended)

1. Buka [supabase.com](https://supabase.com)
2. Create new project
3. Pilih region terdekat
4. Setelah project ready, buka Settings > Database
5. Copy connection string dari bagian "Connection string" > "URI"
6. Ganti `[YOUR-PASSWORD]` dengan password database

### Using Vercel Postgres

1. Di Vercel dashboard, buka project
2. Pilih "Storage" tab
3. Klik "Create Database"
4. Pilih "Postgres"
5. Copy `DATABASE_URL` dari environment variables

### Using Neon

1. Buka [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Paste ke `DATABASE_URL`

## Post-Deployment

### 1. Test Application

- Buka URL deployment
- Register akun baru
- Login dengan akun yang dibuat
- Create project baru
- Test editor dan preview

### 2. Run Migrations

```bash
# Via Vercel CLI
vercel env pull .env
npx prisma migrate deploy

# Atau via Prisma Studio
npx prisma studio
```

### 3. Custom Domain (Optional)

1. Buka Vercel dashboard
2. Pilih project > Settings > Domains
3. Add custom domain
4. Update `NEXTAUTH_URL` environment variable

## Troubleshooting

### Build Error: "Prisma Client not generated"

Solution: Prisma client akan auto-generate saat build. Jika error, tambahkan di `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Database Connection Error

1. Check `DATABASE_URL` format
2. Pastikan database accessible dari Vercel (tidak behind firewall)
3. Test connection dengan `npx prisma db pull`

### Authentication Not Working

1. Pastikan `NEXTAUTH_SECRET` minimal 32 karakter
2. Pastikan `NEXTAUTH_URL` sesuai dengan deployment URL
3. Clear browser cookies dan coba lagi

### Deployment Successful Tapi App Tidak Bekerja

1. Check Vercel function logs
2. Check browser console errors
3. Verify environment variables sudah diset dengan benar

## Monitoring

- **Vercel Analytics**: Built-in analytics
- **Vercel Logs**: Real-time function logs
- **Database**: Monitor via Supabase/Neon dashboard

## Security Notes

1. **Never commit `.env` files**
2. **Use strong `NEXTAUTH_SECRET`** (min 32 characters)
3. **Enable database SSL** (default di Vercel Postgres/Supabase)
4. **Set database connection limits** jika perlu

## Support

Jika ada masalah:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Check [Next.js Documentation](https://nextjs.org/docs)
3. Open issue di GitHub repository

## Estimated Costs

- **Vercel**: Free tier (Hobby) atau $20/bulan (Pro)
- **Database**: 
  - Supabase: Free tier tersedia
  - Vercel Postgres: Free tier untuk hobby projects
  - Neon: Free tier tersedia

**Total untuk development/testing: $0/bulan** 🎉
