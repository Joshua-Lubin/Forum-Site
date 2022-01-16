--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: main; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA main;


ALTER SCHEMA main OWNER TO postgres;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = main, pg_catalog;

--
-- Name: update_date_column(); Type: FUNCTION; Schema: main; Owner: postgres
--

CREATE FUNCTION update_date_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW."Date" = now();
    RETURN NEW;
END;
$$;


ALTER FUNCTION main.update_date_column() OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Authors; Type: TABLE; Schema: main; Owner: postgres
--

CREATE TABLE "Authors" (
    "ForumID" text,
    "Author" text
);


ALTER TABLE "Authors" OWNER TO postgres;

--
-- Name: CommentDates; Type: TABLE; Schema: main; Owner: postgres
--

CREATE TABLE "CommentDates" (
    "CommentID" text,
    "Date" text
);


ALTER TABLE "CommentDates" OWNER TO postgres;

--
-- Name: Comments; Type: TABLE; Schema: main; Owner: postgres
--

CREATE TABLE "Comments" (
    "ForumID" text,
    "CommentID" text,
    "Author" text,
    "Comment" text,
    "RemovedBy" text
);


ALTER TABLE "Comments" OWNER TO postgres;

--
-- Name: Content; Type: TABLE; Schema: main; Owner: postgres
--

CREATE TABLE "Content" (
    "ForumID" text,
    "CurrentContent" text,
    "Date" timestamp with time zone DEFAULT now()
);


ALTER TABLE "Content" OWNER TO postgres;

--
-- Name: Download; Type: TABLE; Schema: main; Owner: postgres
--

CREATE TABLE "Download" (
);


ALTER TABLE "Download" OWNER TO postgres;

--
-- Name: Edits; Type: TABLE; Schema: main; Owner: postgres
--

CREATE TABLE "Edits" (
);


ALTER TABLE "Edits" OWNER TO postgres;

--
-- Name: Name; Type: TABLE; Schema: main; Owner: postgres
--

CREATE TABLE "Name" (
    name text,
    "ForumID" text
);


ALTER TABLE "Name" OWNER TO postgres;

--
-- Name: Website; Type: TABLE; Schema: main; Owner: postgres
--

CREATE TABLE "Website" (
    "ForumID" text
);


ALTER TABLE "Website" OWNER TO postgres;

--
-- Data for Name: Authors; Type: TABLE DATA; Schema: main; Owner: postgres
--

COPY "Authors" ("ForumID", "Author") FROM stdin;
test	AwesomeGuy_123
qZeeczwh	\N
ycRtKjfW	\N
QTNCUcIX	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
lBJdaJeS	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
zzshPJGa	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
yMDVKSgg	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
poAIzsGr	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
RylkprXD	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
LVOcBvoX	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
ZDPSTenw	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
HqRCVIai	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
lIAGXVyT	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
UffACFUo	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
EzasKuhM	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
aEBZaBaY	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
QparkIAD	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
qItTAqAj	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
PeRfSUNA	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
SFSKJpNK	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
xyJweUSO	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
BUZTcrFm	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
QwYyTtxg	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
oYpETAve	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
XvppvSzQ	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
FDRrpPjR	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
xKshTslv	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
vdWaMqZX	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
kVKPJvjA	$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK
\.


--
-- Data for Name: CommentDates; Type: TABLE DATA; Schema: main; Owner: postgres
--

COPY "CommentDates" ("CommentID", "Date") FROM stdin;
\.


--
-- Data for Name: Comments; Type: TABLE DATA; Schema: main; Owner: postgres
--

COPY "Comments" ("ForumID", "CommentID", "Author", "Comment", "RemovedBy") FROM stdin;
\.


--
-- Data for Name: Content; Type: TABLE DATA; Schema: main; Owner: postgres
--

COPY "Content" ("ForumID", "CurrentContent", "Date") FROM stdin;
xyJweUSO	asdafdfasdfasdfaasdsdfasdfasasdfdfad	2016-08-11 10:04:49.256941-07
QwYyTtxg	ASDFADSF &lt;DIV&gt; TEST&lt;/DIV &lt;script&gt;&lt;/script&gt;\r\n	2016-08-11 10:04:49.256941-07
oYpETAve	asdfsadf	2016-08-11 10:04:49.256941-07
XvppvSzQ	asdfasd	2016-08-11 10:14:20.835357-07
FDRrpPjR	aasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa	2016-08-11 10:48:13.153394-07
xKshTslv	More content	2016-08-11 16:41:06.081411-07
vdWaMqZX	asdfasdf	2016-08-11 17:03:36.931004-07
kVKPJvjA	maybe	2016-08-11 17:03:58.746011-07
\.


--
-- Data for Name: Download; Type: TABLE DATA; Schema: main; Owner: postgres
--

COPY "Download"  FROM stdin;
\.


--
-- Data for Name: Edits; Type: TABLE DATA; Schema: main; Owner: postgres
--

COPY "Edits"  FROM stdin;
\.


--
-- Data for Name: Name; Type: TABLE DATA; Schema: main; Owner: postgres
--

COPY "Name" (name, "ForumID") FROM stdin;
Working	test
dsafdsf	UYOjukgj
asdfasdf	qZeeczwh
This is a test	ycRtKjfW
This better work	QTNCUcIX
adsfasdfasdf	lBJdaJeS
asdfasdf	zzshPJGa
dfasdfsa	yMDVKSgg
asdfasdfadsdf	poAIzsGr
asdfasdfa	RylkprXD
asdfasdfa	LVOcBvoX
asdfasdf	ZDPSTenw
adsf	HqRCVIai
asdf	lIAGXVyT
abc	UffACFUo
abc	EzasKuhM
abc	aEBZaBaY
abc	QparkIAD
abc	qItTAqAj
abc	PeRfSUNA
abc	SFSKJpNK
abc	xyJweUSO
DSAFASDF	BUZTcrFm
DSAFASDF	QwYyTtxg
abcdefg	oYpETAve
dssdafsd	XvppvSzQ
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa	FDRrpPjR
This is a test post	xKshTslv
adsfasdf	vdWaMqZX
does this work?	kVKPJvjA
\.


--
-- Data for Name: Website; Type: TABLE DATA; Schema: main; Owner: postgres
--

COPY "Website" ("ForumID") FROM stdin;
\.


--
-- Name: update_date; Type: TRIGGER; Schema: main; Owner: postgres
--

CREATE TRIGGER update_date BEFORE UPDATE ON "Content" FOR EACH ROW EXECUTE PROCEDURE update_date_column();


--
-- PostgreSQL database dump complete
--

