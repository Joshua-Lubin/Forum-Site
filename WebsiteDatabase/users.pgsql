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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: names; Type: TABLE; Schema: main; Owner: postgres
--

CREATE TABLE names (
    "UserID" text,
    "1" text
);


ALTER TABLE names OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: main; Owner: postgres
--

CREATE TABLE users (
    "UserID" text,
    email text,
    password text,
    token text
);


ALTER TABLE users OWNER TO postgres;

--
-- Data for Name: names; Type: TABLE DATA; Schema: main; Owner: postgres
--

COPY names ("UserID", "1") FROM stdin;
$2a$10$1UeQdsyaPUdCHtTA7orxqu0y9h.j.dgL8gLGYH0ifyxdChejo7ARq	mrgiggles199
$2a$10$mArIhUDVfKbPkxjQdGBoQO6iVK1ZijdmdD.NDGK2okSxN9xKRlSnO	mgigs
$2a$10$enuj8Dy6oQyfckJjejOiFes/jbzKRgINQxH34g1cWP58jRX1uEA4S	mgigggles
$2a$10$xpFE3fWARNH2EY33TIQCQ.AOiAsKtyXQdxodupZqovBhNivLNoVeK	mkadsflkf
$2a$10$RlWI5SwZIYfQJq9ROBGk2u1X3ko5HqX76mr3pFjuh2QzAPzBcU1PG	asfadsdfsa
$2a$10$y4.Qb6E7hvqDv/l6/./.teWyU.ldytI/jQBJMGS8swT/FqDM7rOp2	asfkdkj
$2a$10$KH3nCvmuyoYSK3BRPieuo.8UTMwxASrb4ILVAaypLEWqXA37e2B/O	abcdefg
$2a$10$4MiCdh/IHmPWY7YuXHz7tOkrzGQ0n2X8Pu.FTCHbSrDC2rkwx0q3W	jlmortonr
$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK	testUser
$2a$10$ujSBiUWWlAh3E7WJrPcEge2I7AXu8FXFJhiB84oZEx7bXRhAwJhJi	abcdefgh
$2a$10$Up2B6GRegH4UgVfvpJicWuVXcfx/HgkdbOUREXIDxHXnnVNby8hhu	thisismyusernam
$2a$10$wgw6FZoyrZ5YkvGqd08enO5R/.ir9tqr6U46OovUJpa3dwS3JLFDO	asdfasdf
$2a$10$bUiM.3ROmeqGrwZuXBxRY.ZGyi5x3schN7aFZ92enu6fmuE47l9nK	jlmoasdf
$2a$10$SOUBKeAw2lA0SY4q2dJ8YecWCIVDzV5xzkrlQsmnRSrUXwlLkKx/i	sadfsasdf
$2a$10$nXYgdECib3RgurVVtYKP4uGDJwJ5I5BdCbQlH/PF0vu2NTWlDFqAm	asdfasdfdsa
$2a$10$/HKhEjnZVDHAdQQZkfyGMeuKekdCBO.xbIjN16RREyBfsF6UR.ZVu	abcdefgasdfasf
$2a$10$a1ujCZR1ABjiydZmJKnn2.afY2piFaizqtfltE/YHI0eYleKnNCc6	asdfasfd
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: main; Owner: postgres
--

COPY users ("UserID", email, password, token) FROM stdin;
$2a$10$1UeQdsyaPUdCHtTA7orxqu0y9h.j.dgL8gLGYH0ifyxdChejo7ARq	jlmortonr@gmail.com	Facetime2.0	abc
$2a$10$mArIhUDVfKbPkxjQdGBoQO6iVK1ZijdmdD.NDGK2okSxN9xKRlSnO	jl58777@adsfjk.com	Facetime2.0	$2a$10$adN10qE.qfUDwdYgnh29JOnw7fcDYrlVIhtp8pv2ndrc0ZvLSs.i2
$2a$10$enuj8Dy6oQyfckJjejOiFes/jbzKRgINQxH34g1cWP58jRX1uEA4S	jalsdfj@gmail.com	Facetime2.0	$2a$10$GGkkoOoB1sfVxicJL7eEW.Aqmll3EGnW/Ue0O4ZVv3qsFg/5S0ywS
$2a$10$xpFE3fWARNH2EY33TIQCQ.AOiAsKtyXQdxodupZqovBhNivLNoVeK	asdfkladsfljk@akfdkl.com	Facetime2.0	$2a$10$t5cRykrlFbBVDgSa0QTH5eTfCVpgsQmnEoCMY6un/jq2iin40lhVC
$2a$10$RlWI5SwZIYfQJq9ROBGk2u1X3ko5HqX76mr3pFjuh2QzAPzBcU1PG	jsaflkd@sadklfk.com	Facetime2.0	$2a$10$TIM4JvGaTBLaVH6xkQAUkuiKTz9ZfuotR5LKh3mUl9Grrwph5frJe
$2a$10$y4.Qb6E7hvqDv/l6/./.teWyU.ldytI/jQBJMGS8swT/FqDM7rOp2	jlmortonr@adkf.com	Facetime2.0	$2a$10$A5vfq7YMrOPDHpu9/bq3CuenKJ/Y/K3YoS2MJDTPEOmL2LEmSc6fG
$2a$10$KH3nCvmuyoYSK3BRPieuo.8UTMwxASrb4ILVAaypLEWqXA37e2B/O	asdfk@akdf.com	Facetime2.0	$2a$10$nyDHcTtr0xjiUBZTEhdxGuNevwKCtVegC8D8zkrlKrPT9OFj2eYf.
$2a$10$4MiCdh/IHmPWY7YuXHz7tOkrzGQ0n2X8Pu.FTCHbSrDC2rkwx0q3W	jlmortonr@kdaf.com	1234567890	$2a$10$pVBOK/y6pdnY54HrSLCov.Dj2qqPLEAcmRnNOYABK0dQZ4pPgALt.
$2a$10$ujSBiUWWlAh3E7WJrPcEge2I7AXu8FXFJhiB84oZEx7bXRhAwJhJi	asdfsf@adf.com	$2a$10$RL7Z14zzouMqqKVw7VOss./RMBpt54yB/mdkzXVysjE32926ehX9i	$2a$10$gqLlKBil3Prs3avcTQjWO.iM8zvLZc2Mk7neOsG7smLEsnW9uhhY6
$2a$10$Up2B6GRegH4UgVfvpJicWuVXcfx/HgkdbOUREXIDxHXnnVNby8hhu	jsdaflk@kadjfa.com	$2a$10$ZTt7QSxWZwBHdzPuiiwj0uttpt9u3NC1nkIi4TZrx3TT40N5iLJb6	$2a$10$mIPCBXF27xQtXo/9h0inTuoSRyg6wv2MEI1.OjFQDMPIZQtWP.rz6
$2a$10$wgw6FZoyrZ5YkvGqd08enO5R/.ir9tqr6U46OovUJpa3dwS3JLFDO	asdfafds@adfsdf.com	$2a$10$cP3HMJuJhkdKuYYS66AKNuywQ/Mi2bAOILfKI4WYxEVUaOu7PSNUS	$2a$10$sQW6bxKTzqqJHyNRKNWlV.zJmg1oz8yWnlhiUblg11eF7B/.OqMZm
$2a$10$bUiM.3ROmeqGrwZuXBxRY.ZGyi5x3schN7aFZ92enu6fmuE47l9nK	jlmortonr@adf.com	$2a$10$f5yZ3Lt9u/yg8z4dno7gxOZHBSxjuDqLruxzMATkTYc31DXYyslbi	$2a$10$9MArZ0GQFlQUzzSTmSacO.HSGMRhgGy108S4lXy/ih2504k4uedT2
$2a$10$SOUBKeAw2lA0SY4q2dJ8YecWCIVDzV5xzkrlQsmnRSrUXwlLkKx/i	jsdlafkjsd@akdjfk.com	$2a$10$7Qu4piNEKjlp/Qirm/NmR.o.3T.OkbPyKDGPPFnN6UMuzp5Skez6m	$2a$10$aEpEYYegLXnNtLU1X82SeOvri5J8KvnIprc7utsRhtDSYFhHxPw.6
$2a$10$nXYgdECib3RgurVVtYKP4uGDJwJ5I5BdCbQlH/PF0vu2NTWlDFqAm	asdfasdf@afdadsf.com	$2a$10$o1sjGe/Orb0thNH.p.bGHezpW9Uansx.9QSkz5Jb5ddrZmG4CrBBy	\N
$2a$10$/HKhEjnZVDHAdQQZkfyGMeuKekdCBO.xbIjN16RREyBfsF6UR.ZVu	asfddas@adsf.com	$2a$10$t8HorxTUxz.0MiVOr9kck.wjHYRtbBBp4dneMLgMDSZ1KHNWJLAPC	\N
$2a$10$a1ujCZR1ABjiydZmJKnn2.afY2piFaizqtfltE/YHI0eYleKnNCc6	sadfsa@adfasdf.com	$2a$10$qhnVD81MHuHXBCIHPKit6eVs9jMnpYQ12LH17ULkNV7FL9E92FNTW	\N
$2a$10$loRn77i.2Cs7L1G.xitYZ./xW8DlB1XyJIo.E83mNJ9CZhZB/IuBK	test@test.com	$2a$10$GdQWQOjNsYkmWTYuRWwqfuO1t0BGPH0ksApSljKUdg3ZbrDHegMg.	$2a$10$y62G92TEvIvsAglpm93xZeNB06i78t1wei9xO/EmsJIs2OVHyWd/6
\.


--
-- PostgreSQL database dump complete
--

