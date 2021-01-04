--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-01-04 18:28:09

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
-- TOC entry 200 (class 1259 OID 16509)
-- Name: definitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.definitions (
    id integer NOT NULL,
    word_id integer,
    definition text,
    user_id integer
);


ALTER TABLE public.definitions OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16515)
-- Name: definitions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.definitions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.definitions_id_seq OWNER TO postgres;

--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 201
-- Name: definitions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.definitions_id_seq OWNED BY public.definitions.id;


--
-- TOC entry 202 (class 1259 OID 16517)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text,
    password text,
    name text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16523)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 206 (class 1259 OID 16545)
-- Name: votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.votes (
    user_id integer,
    definition_id integer,
    value integer
);


ALTER TABLE public.votes OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16525)
-- Name: words; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.words (
    id integer NOT NULL,
    word text
);


ALTER TABLE public.words OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16531)
-- Name: words_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.words_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.words_id_seq OWNER TO postgres;

--
-- TOC entry 3022 (class 0 OID 0)
-- Dependencies: 205
-- Name: words_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.words_id_seq OWNED BY public.words.id;


--
-- TOC entry 2869 (class 2604 OID 16533)
-- Name: definitions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.definitions ALTER COLUMN id SET DEFAULT nextval('public.definitions_id_seq'::regclass);


--
-- TOC entry 2870 (class 2604 OID 16534)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2871 (class 2604 OID 16535)
-- Name: words id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.words ALTER COLUMN id SET DEFAULT nextval('public.words_id_seq'::regclass);


--
-- TOC entry 3008 (class 0 OID 16509)
-- Dependencies: 200
-- Data for Name: definitions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.definitions VALUES (38, 1, 'hello 2', 3);
INSERT INTO public.definitions VALUES (39, 1, 'celle ci fonctionn', 5);
INSERT INTO public.definitions VALUES (40, 1, 'eheh', 3);
INSERT INTO public.definitions VALUES (37, 1, 'Une porte', 5);
INSERT INTO public.definitions VALUES (41, 1, 'testtttttttttttttttttttttttttttt', 3);
INSERT INTO public.definitions VALUES (42, 1, 'Ma plus belle définition', 6);
INSERT INTO public.definitions VALUES (43, 1, 'Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définition Voici une longue définitionVoici une longue définition Voici une longue définitionVoici une longue définition', 6);


--
-- TOC entry 3010 (class 0 OID 16517)
-- Dependencies: 202
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'test@gmail.com', 'hello', NULL);
INSERT INTO public.users VALUES (3, 'test', '$2b$10$KhqINiteg4RmMvnaRMo4DuZo3Ad5oQiZO8Q8AQ4nNygh6N5XSQJmy', NULL);
INSERT INTO public.users VALUES (4, 'test1', '$2b$10$7ZrTYq0iUWPF3IAXzWHThOZFIn/Z4ak83Hi4.jnqC66FwYBjtdUqC', NULL);
INSERT INTO public.users VALUES (5, 'admin', '$2b$10$Xa3h5k4kv8oZ/drO88YUq.3DmKNS8mg0zgyA1tspdFNHKbCYKwzeC', 'Admin');
INSERT INTO public.users VALUES (6, '1', '$2b$10$COw.wusVcQ6g/LAT7yvKZuC2sLKe9Lup6b1DGSPk6yLq7sL.QBjM.', 'Theticman');


--
-- TOC entry 3014 (class 0 OID 16545)
-- Dependencies: 206
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.votes VALUES (3, 40, -1);
INSERT INTO public.votes VALUES (5, 38, 1);
INSERT INTO public.votes VALUES (3, 38, 1);
INSERT INTO public.votes VALUES (3, 41, -1);
INSERT INTO public.votes VALUES (3, 39, 1);
INSERT INTO public.votes VALUES (6, 42, 1);
INSERT INTO public.votes VALUES (6, 38, -1);
INSERT INTO public.votes VALUES (6, 39, -1);
INSERT INTO public.votes VALUES (3, 37, -1);


--
-- TOC entry 3012 (class 0 OID 16525)
-- Dependencies: 204
-- Data for Name: words; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.words VALUES (1, 'door');
INSERT INTO public.words VALUES (2, 'light');
INSERT INTO public.words VALUES (3, 'speed');
INSERT INTO public.words VALUES (4, 'personnel');
INSERT INTO public.words VALUES (5, 'Fer');
INSERT INTO public.words VALUES (8, 'Sandwich');


--
-- TOC entry 3023 (class 0 OID 0)
-- Dependencies: 201
-- Name: definitions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.definitions_id_seq', 43, true);


--
-- TOC entry 3024 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- TOC entry 3025 (class 0 OID 0)
-- Dependencies: 205
-- Name: words_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.words_id_seq', 1, false);


--
-- TOC entry 2873 (class 2606 OID 16537)
-- Name: definitions definitions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.definitions
    ADD CONSTRAINT definitions_pkey PRIMARY KEY (id);


--
-- TOC entry 2875 (class 2606 OID 16539)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2877 (class 2606 OID 16541)
-- Name: words words_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.words
    ADD CONSTRAINT words_pkey PRIMARY KEY (id);


-- Completed on 2021-01-04 18:28:10

--
-- PostgreSQL database dump complete
--

