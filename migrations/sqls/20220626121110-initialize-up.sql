-- Table: public.user

-- DROP TABLE public."user";

CREATE TABLE public."user"
(
   id Integer Primary Key Generated Always as Identity,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    address character varying COLLATE pg_catalog."default" NOT NULL,
    "nationalCode" character varying COLLATE pg_catalog."default" NOT NULL,
    age integer NOT NULL,
 )

TABLESPACE pg_default;

ALTER TABLE public."user"
    OWNER to postgres;