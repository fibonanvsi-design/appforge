# 🚀 CARA SETUP DATABASE APPFORGE - SUPER MUDAH!

## ⏱️ Waktu: 2 Menit Saja!

---

## 📋 **Step 1: Buka Neon Console**

1. Buka browser baru
2. Pergi ke: **https://console.neon.tech**
3. Login dengan akun Anda
4. Anda akan lihat project database Anda

---

## 📋 **Step 2: Buka SQL Editor**

1. Di sidebar kiri, klik **"SQL Editor"**
2. Atau langsung buka: https://console.neon.tech/app/projects

---

## 📋 **Step 3: Copy & Run SQL (30 detik)**

**Copy seluruh SQL di bawah ini:**

```sql
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "framework" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ProjectFile" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ProjectFile_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "EnvironmentVariable" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "env" TEXT NOT NULL DEFAULT 'production',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "EnvironmentVariable_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Deployment" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "url" TEXT,
    "containerId" TEXT,
    "buildDuration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Deployment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "DeploymentLog" (
    "id" TEXT NOT NULL,
    "deploymentId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'info',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DeploymentLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "ProjectFile_projectId_path_key" ON "ProjectFile"("projectId", "path");
CREATE UNIQUE INDEX IF NOT EXISTS "EnvironmentVariable_projectId_key_env_key" ON "EnvironmentVariable"("projectId", "key", "env");
CREATE INDEX IF NOT EXISTS "Project_userId_idx" ON "Project"("userId");
CREATE INDEX IF NOT EXISTS "ProjectFile_projectId_idx" ON "ProjectFile"("projectId");
CREATE INDEX IF NOT EXISTS "EnvironmentVariable_projectId_idx" ON "EnvironmentVariable"("projectId");
CREATE INDEX IF NOT EXISTS "Deployment_projectId_idx" ON "Deployment"("projectId");
CREATE INDEX IF NOT EXISTS "DeploymentLog_deploymentId_idx" ON "DeploymentLog"("deploymentId");

ALTER TABLE "Project" DROP CONSTRAINT IF EXISTS "Project_userId_fkey";
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ProjectFile" DROP CONSTRAINT IF EXISTS "ProjectFile_projectId_fkey";
ALTER TABLE "ProjectFile" ADD CONSTRAINT "ProjectFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "EnvironmentVariable" DROP CONSTRAINT IF EXISTS "EnvironmentVariable_projectId_fkey";
ALTER TABLE "EnvironmentVariable" ADD CONSTRAINT "EnvironmentVariable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Deployment" DROP CONSTRAINT IF EXISTS "Deployment_projectId_fkey";
ALTER TABLE "Deployment" ADD CONSTRAINT "Deployment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "DeploymentLog" DROP CONSTRAINT IF EXISTS "DeploymentLog_deploymentId_fkey";
ALTER TABLE "DeploymentLog" ADD CONSTRAINT "DeploymentLog_deploymentId_fkey" FOREIGN KEY ("deploymentId") REFERENCES "Deployment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

**Lalu:**
1. Paste ke SQL Editor di Neon
2. Klik tombol **"Run"** (atau tekan Ctrl+Enter)
3. Tunggu sampai muncul "Success" ✅

---

## 📋 **Step 4: Test Aplikasi! (1 menit)**

1. Buka: **https://appforge-iota-seven.vercel.app**
2. Klik **"Sign up"** atau navigasi ke `/register`
3. Register akun baru:
   - **Email:** contoh@email.com
   - **Password:** minimum 6 karakter
   - **Name:** Nama Anda (opsional)
4. Klik **"Create Account"**
5. Login dengan akun yang baru dibuat
6. **SELESAI!** Dashboard akan muncul 🎉

---

## ✅ **Checklist Final:**

- [ ] Buka Neon Console
- [ ] Buka SQL Editor
- [ ] Copy SQL script di atas
- [ ] Paste & Run di SQL Editor
- [ ] Tunggu "Success"
- [ ] Buka aplikasi: https://appforge-iota-seven.vercel.app
- [ ] Register akun baru
- [ ] Login
- [ ] Create project pertama!

---

## 🎯 **URL Aplikasi:**

```
https://appforge-iota-seven.vercel.app
```

---

## 💡 **Troubleshooting:**

**Q: SQL Error "relation already exists"**
A: Abaikan saja, artinya tabel sudah dibuat. Lanjut ke step berikutnya.

**Q: Tidak bisa register**
A: Pastikan SQL script sudah di-run dengan sukses di Neon Console.

**Q: Login error**
A: Clear browser cache dan coba lagi.

---

## 🎉 **SELESAI!**

Setelah run SQL script, aplikasi **100% siap digunakan**!

**Fitur yang bisa dicoba:**
- ✅ Register & Login
- ✅ Create Project (React, Next.js, Vue, HTML)
- ✅ Monaco Code Editor
- ✅ File Explorer (create, edit, delete files)
- ✅ Live Preview
- ✅ Deploy (simulated)
- ✅ Deployment History

---

**Selamat mencoba AppForge! 🚀**
