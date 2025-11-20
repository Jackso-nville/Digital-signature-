CREATE TABLE "admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "certificates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_name" varchar(255) NOT NULL,
	"student_email" varchar(255) NOT NULL,
	"cohort" varchar(255) NOT NULL,
	"metadata" jsonb,
	"signature" text NOT NULL,
	"signature_method" varchar(50) NOT NULL,
	"file_url" text,
	"issued_by" uuid,
	"issued_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"revoked" boolean DEFAULT false NOT NULL,
	"revoked_reason" text,
	"revoked_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "verification_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"certificate_id" uuid NOT NULL,
	"ip_address" varchar(64),
	"user_agent" text,
	"verified_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_issued_by_admins_id_fk" FOREIGN KEY ("issued_by") REFERENCES "public"."admins"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_logs" ADD CONSTRAINT "verification_logs_certificate_id_certificates_id_fk" FOREIGN KEY ("certificate_id") REFERENCES "public"."certificates"("id") ON DELETE cascade ON UPDATE no action;