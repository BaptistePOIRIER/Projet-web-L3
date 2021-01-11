--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-01-11 16:10:44

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
-- TOC entry 200 (class 1259 OID 16407)
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
-- TOC entry 201 (class 1259 OID 16413)
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
-- TOC entry 3014 (class 0 OID 0)
-- Dependencies: 201
-- Name: definitions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.definitions_id_seq OWNED BY public.definitions.id;


--
-- TOC entry 202 (class 1259 OID 16415)
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
-- TOC entry 203 (class 1259 OID 16421)
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
-- TOC entry 3015 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 204 (class 1259 OID 16423)
-- Name: votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.votes (
    user_id integer,
    definition_id integer,
    value integer
);


ALTER TABLE public.votes OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16426)
-- Name: words; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.words (
    id integer NOT NULL,
    word text
);


ALTER TABLE public.words OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16432)
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
-- TOC entry 3016 (class 0 OID 0)
-- Dependencies: 206
-- Name: words_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.words_id_seq OWNED BY public.words.id;


--
-- TOC entry 2869 (class 2604 OID 16434)
-- Name: definitions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.definitions ALTER COLUMN id SET DEFAULT nextval('public.definitions_id_seq'::regclass);


--
-- TOC entry 2870 (class 2604 OID 16435)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2871 (class 2604 OID 16436)
-- Name: words id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.words ALTER COLUMN id SET DEFAULT nextval('public.words_id_seq'::regclass);


--
-- TOC entry 3002 (class 0 OID 16407)
-- Dependencies: 200
-- Data for Name: definitions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.definitions VALUES (1, 1, 'Ouvrage dramatique mis en musique, composé de récitatifs, d''airs, de chœurs avec accompagnement d''orchestre.', 1);
INSERT INTO public.definitions VALUES (2, 1, 'Théâtre où l''on joue des opéras.', 1);
INSERT INTO public.definitions VALUES (3, 1, 'L''opéra est une pâtisserie française constituée d’une succession de biscuit Joconde, de ganache au chocolat et de crème au beurre au café.', 2);
INSERT INTO public.definitions VALUES (4, 2, 'Lumière, caractère de ce qui est clair.', 2);
INSERT INTO public.definitions VALUES (5, 2, 'Qualité de ce qui est facilement intelligible.', 2);
INSERT INTO public.definitions VALUES (6, 3, 'Petit mammifère rongeur.', 3);
INSERT INTO public.definitions VALUES (7, 1, 'Batiment comme l''opéra Garnier.', 3);
INSERT INTO public.definitions VALUES (8, 3, 'Boîtier connecté à un ordinateur, qui permet, par déplacement et pression sur un bouton (cliquer), de donner des instructions.', 2);
INSERT INTO public.definitions VALUES (9, 4, 'Faire pénétrer profondément (dans le cœur, l''esprit de qqn) en laissant une empreinte durable.', 1);
INSERT INTO public.definitions VALUES (10, 4, 'Produire sur le papier (le contenu d''un fichier informatique) à l''aide d''une imprimante.', 1);
INSERT INTO public.definitions VALUES (11, 4, 'Communiquer, transmettre (un mouvement, une impulsion…).', 2);
INSERT INTO public.definitions VALUES (12, 4, 'Reproduire (un texte) par la technique de l''imprimerie.', 2);


--
-- TOC entry 3004 (class 0 OID 16415)
-- Dependencies: 202
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'admin', '$2b$10$Xa3h5k4kv8oZ/drO88YUq.3DmKNS8mg0zgyA1tspdFNHKbCYKwzeC', 'Admin');
INSERT INTO public.users VALUES (2, 'baptiste@gmail.com', '$2b$10$nbRTh5AtILlSGoekrpHDKOq8LK8nTDLX5oUgYVTjqRjrdwAVvQmVS', 'Baptiste');
INSERT INTO public.users VALUES (3, 'william@gmail.com', '$2b$10$s4MN.gQxexFaiYpJs7jyxOFXbYkgqkh/Mz7BCiKhK7laBp7NKrR/2', 'William');


--
-- TOC entry 3006 (class 0 OID 16423)
-- Dependencies: 204
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.votes VALUES (1, 1, 1);
INSERT INTO public.votes VALUES (2, 1, 1);
INSERT INTO public.votes VALUES (2, 2, -1);
INSERT INTO public.votes VALUES (2, 5, 1);
INSERT INTO public.votes VALUES (3, 6, 1);
INSERT INTO public.votes VALUES (3, 5, 1);
INSERT INTO public.votes VALUES (3, 1, 1);
INSERT INTO public.votes VALUES (3, 3, 1);
INSERT INTO public.votes VALUES (3, 2, -1);
INSERT INTO public.votes VALUES (2, 8, 1);
INSERT INTO public.votes VALUES (2, 6, -1);
INSERT INTO public.votes VALUES (1, 4, -1);
INSERT INTO public.votes VALUES (1, 8, 1);
INSERT INTO public.votes VALUES (1, 6, 1);
INSERT INTO public.votes VALUES (1, 7, 1);
INSERT INTO public.votes VALUES (1, 3, 1);
INSERT INTO public.votes VALUES (2, 10, 1);
INSERT INTO public.votes VALUES (2, 9, -1);
INSERT INTO public.votes VALUES (2, 12, 1);
INSERT INTO public.votes VALUES (1, 10, 1);
INSERT INTO public.votes VALUES (1, 11, 1);


--
-- TOC entry 3007 (class 0 OID 16426)
-- Dependencies: 205
-- Data for Name: words; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.words VALUES (1, 'opéra');
INSERT INTO public.words VALUES (2, 'clarté');
INSERT INTO public.words VALUES (3, 'souris');
INSERT INTO public.words VALUES (4, 'imprimer');


--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 201
-- Name: definitions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.definitions_id_seq', 12, true);


--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 206
-- Name: words_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.words_id_seq', 4, true);


-- Completed on 2021-01-11 16:10:44

--
-- PostgreSQL database dump complete
--

