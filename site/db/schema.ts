import {
    pgTable,
    text,
    varchar,
    uuid,
    timestamp,
    boolean,
    jsonb,
} from "drizzle-orm/pg-core";

export const admins = pgTable("admins", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const certificates = pgTable("certificates", {
    id: uuid("id").defaultRandom().primaryKey(),
    studentName: varchar("student_name", { length: 255 }).notNull(),
    studentEmail: varchar("student_email", { length: 255 }).notNull(),
    cohort: varchar("cohort", { length: 255 }).notNull(),
    metadata: jsonb("metadata"),
    signature: text("signature").notNull(),
    signatureMethod: varchar("signature_method", { length: 50 }).notNull(),
    fileUrl: text("file_url"),
    issuedBy: uuid("issued_by")
        .references(() => admins.id, { onDelete: "set null" }),
    issuedAt: timestamp("issued_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    revoked: boolean("revoked").default(false).notNull(),
    revokedReason: text("revoked_reason"),
    revokedAt: timestamp("revoked_at"),
});

export const verificationLogs = pgTable("verification_logs", {
    id: uuid("id").defaultRandom().primaryKey(),
    certificateId: uuid("certificate_id")
        .references(() => certificates.id, { onDelete: "cascade" })
        .notNull(),
    ipAddress: varchar("ip_address", { length: 64 }),
    userAgent: text("user_agent"),
    verifiedAt: timestamp("verified_at").defaultNow().notNull(),
});
