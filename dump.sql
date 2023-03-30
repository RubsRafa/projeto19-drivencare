--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: schedules; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schedules (
    id integer NOT NULL,
    id_pacient integer NOT NULL,
    id_doctor integer NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    status boolean,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: schedules_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schedules_history (
    id integer NOT NULL,
    id_shedule integer NOT NULL,
    status boolean DEFAULT true
);


--
-- Name: schedules_history_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.schedules_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: schedules_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.schedules_history_id_seq OWNED BY public.schedules_history.id;


--
-- Name: schedules_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.schedules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: schedules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.schedules_id_seq OWNED BY public.schedules.id;


--
-- Name: specialties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.specialties (
    id integer NOT NULL,
    specialty text NOT NULL
);


--
-- Name: specialties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.specialties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: specialties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.specialties_id_seq OWNED BY public.specialties.id;


--
-- Name: users_doctors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_doctors (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    id_specialty integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_doctors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_doctors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_doctors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_doctors_id_seq OWNED BY public.users_doctors.id;


--
-- Name: users_pacients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_pacients (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_pacients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_pacients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_pacients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_pacients_id_seq OWNED BY public.users_pacients.id;


--
-- Name: schedules id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedules ALTER COLUMN id SET DEFAULT nextval('public.schedules_id_seq'::regclass);


--
-- Name: schedules_history id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedules_history ALTER COLUMN id SET DEFAULT nextval('public.schedules_history_id_seq'::regclass);


--
-- Name: specialties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties ALTER COLUMN id SET DEFAULT nextval('public.specialties_id_seq'::regclass);


--
-- Name: users_doctors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_doctors ALTER COLUMN id SET DEFAULT nextval('public.users_doctors_id_seq'::regclass);


--
-- Name: users_pacients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_pacients ALTER COLUMN id SET DEFAULT nextval('public.users_pacients_id_seq'::regclass);


--
-- Data for Name: schedules; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: schedules_history; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: specialties; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users_doctors; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users_pacients; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: schedules_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.schedules_history_id_seq', 1, false);


--
-- Name: schedules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.schedules_id_seq', 1, false);


--
-- Name: specialties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.specialties_id_seq', 1, false);


--
-- Name: users_doctors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_doctors_id_seq', 1, false);


--
-- Name: users_pacients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_pacients_id_seq', 1, false);


--
-- Name: schedules_history schedules_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedules_history
    ADD CONSTRAINT schedules_history_pkey PRIMARY KEY (id);


--
-- Name: schedules schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (id);


--
-- Name: specialties specialties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_pkey PRIMARY KEY (id);


--
-- Name: users_doctors users_doctors_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_doctors
    ADD CONSTRAINT users_doctors_email_key UNIQUE (email);


--
-- Name: users_doctors users_doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_doctors
    ADD CONSTRAINT users_doctors_pkey PRIMARY KEY (id);


--
-- Name: users_pacients users_pacients_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_pacients
    ADD CONSTRAINT users_pacients_email_key UNIQUE (email);


--
-- Name: users_pacients users_pacients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_pacients
    ADD CONSTRAINT users_pacients_pkey PRIMARY KEY (id);


--
-- Name: users_doctors fk_doctors_specialties; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_doctors
    ADD CONSTRAINT fk_doctors_specialties FOREIGN KEY (id_specialty) REFERENCES public.specialties(id);


--
-- Name: schedules fk_schedules_doctors; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT fk_schedules_doctors FOREIGN KEY (id_doctor) REFERENCES public.users_doctors(id);


--
-- Name: schedules_history fk_schedules_history_schedules; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedules_history
    ADD CONSTRAINT fk_schedules_history_schedules FOREIGN KEY (id_shedule) REFERENCES public.schedules(id);


--
-- Name: schedules fk_schedules_pacients; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT fk_schedules_pacients FOREIGN KEY (id_pacient) REFERENCES public.users_pacients(id);


--
-- PostgreSQL database dump complete
--

