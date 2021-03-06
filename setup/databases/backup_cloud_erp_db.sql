PGDMP     ;                    w         
   CloudErpDB #   10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)     11.2 (Ubuntu 11.2-1.pgdg16.04+1) c   2           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            3           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            4           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            5           1262    16385 
   CloudErpDB    DATABASE     ~   CREATE DATABASE "CloudErpDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE "CloudErpDB";
             postgres    false            �           1255    123737 
   downtime()    FUNCTION     �  CREATE FUNCTION public.downtime() RETURNS TABLE(machineidm integer, machineide integer, startdate timestamp without time zone, enddate timestamp without time zone, startworkingdate date, downtime double precision)
    LANGUAGE plpgsql
    AS $$
BEGIN


RETURN QUERY select machines.machine_id, machine_events.machine_id, machine_events.date_time_event_start, machine_events.date_time_event_end, machines.machine_startworkdate, 

extract (epoch FROM age (current_date, machines.machine_startworkdate ) - age (machine_events.date_time_event_end, machine_events.date_time_event_start))/3600

from public.machines, public.machine_events
where machine_events.event_id = 6 and machines.machine_id = machine_events.machine_id;

END ; $$;
 !   DROP FUNCTION public.downtime();
       public       marabout    false            �           1255    82852    failuretime()    FUNCTION     �  CREATE FUNCTION public.failuretime() RETURNS TABLE(ev_id integer, machineid integer, dateevstart timestamp without time zone, dateevend timestamp without time zone, down_time interval)
    LANGUAGE plpgsql
    AS $$
BEGIN
    
RETURN QUERY select event_id, machine_id, date_time_event_start, date_time_event_end, age(date_time_event_end, date_time_event_start)
from public.machine_events
where event_id = 4;

END ; $$;
 $   DROP FUNCTION public.failuretime();
       public       marabout    false            �           1255    91038    machinefailureeventshistory()    FUNCTION     o  CREATE FUNCTION public.machinefailureeventshistory() RETURNS TABLE(revisionid integer, machid integer, machinemodel text, machinestartworkdate date, machineworkingevt text, machinemanufaclifetime numeric, machineproductivity numeric, machinetotalstitchcount numeric, lineid integer, machinetotaluptime numeric, smid integer, groupid integer, machinetotalworkinghours numeric, machinelabel text, updatedat timestamp without time zone, machinetotaldowntime numeric, rev_id integer, machevid integer, datetimeeventstart timestamp without time zone, eventtype text, eventid integer, datetimeeventend timestamp without time zone, updated_at timestamp without time zone, machineevid integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    
RETURN QUERY select * from public.revision_machine, public.revision_events 
where revision_machine.machine_id = revision_events.machine_id;

END ; $$;
 4   DROP FUNCTION public.machinefailureeventshistory();
       public       marabout    false            �           1255    83091    mechanicconnexiontime()    FUNCTION     �  CREATE FUNCTION public.mechanicconnexiontime() RETURNS TABLE(mechaniceventid integer, id_machine integer, emplyeeid integer, datetimestartop timestamp without time zone, datetimeendop timestamp without time zone, mechanicconnexiontime interval)
    LANGUAGE plpgsql
    AS $$
BEGIN
    
RETURN QUERY select mechanic_events_id, machine_id, employee_id, date_time_event_start, date_time_event_end, age(date_time_event_end, date_time_event_start)
from public.mechanic_events
where events_ms_id = 1;

END ; $$;
 .   DROP FUNCTION public.mechanicconnexiontime();
       public       marabout    false            �           1255    83092    mechanicworkingtime()    FUNCTION     �  CREATE FUNCTION public.mechanicworkingtime() RETURNS TABLE(mechaniceventid integer, id_machine integer, emplyeeid integer, datetimestartop timestamp without time zone, datetimeendop timestamp without time zone, mechanicworkingtime interval)
    LANGUAGE plpgsql
    AS $$
BEGIN
    
RETURN QUERY select mechanic_events_id, machine_id, employee_id, date_time_event_start, date_time_event_end, age(date_time_event_end, date_time_event_start)
from public.mechanic_events
where events_ms_id = 2;

END ; $$;
 ,   DROP FUNCTION public.mechanicworkingtime();
       public       marabout    false            �           1255    82840    needlechangetime()    FUNCTION     �  CREATE FUNCTION public.needlechangetime() RETURNS TABLE(ev_id integer, machineid integer, dateevstart timestamp without time zone, dateevend timestamp without time zone, needle_change_time interval)
    LANGUAGE plpgsql
    AS $$
BEGIN
    
RETURN QUERY select event_id, machine_id, date_time_event_start, date_time_event_end, age(date_time_event_end, date_time_event_start)
from public.machine_events
where event_id = 1;

END ; $$;
 )   DROP FUNCTION public.needlechangetime();
       public       marabout    false            �           1255    82841    oilchangetime()    FUNCTION     �  CREATE FUNCTION public.oilchangetime() RETURNS TABLE(ev_id integer, machineid integer, dateevstart timestamp without time zone, dateevend timestamp without time zone, needle_change_time interval)
    LANGUAGE plpgsql
    AS $$
BEGIN
    
RETURN QUERY select event_id, machine_id, date_time_event_start, date_time_event_end, age(date_time_event_end, date_time_event_start)
from public.machine_events
where event_id = 2;

END ; $$;
 &   DROP FUNCTION public.oilchangetime();
       public       marabout    false            �           1255    83089    operatorconnexiontime()    FUNCTION     �  CREATE FUNCTION public.operatorconnexiontime() RETURNS TABLE(op_id integer, id_machine integer, employeeid integer, datetimestartop timestamp without time zone, datetimeendop timestamp without time zone, operatorconnexiontime interval)
    LANGUAGE plpgsql
    AS $$
BEGIN
    
RETURN QUERY select id_op_event, machine_id, employee_id, date_time_event_start, date_time_event_end, age(date_time_event_end, date_time_event_start)
from public.operator_events
where event_op_id = 1;

END ; $$;
 .   DROP FUNCTION public.operatorconnexiontime();
       public       marabout    false            �           1255    83090    operatoroperatingtime()    FUNCTION     �  CREATE FUNCTION public.operatoroperatingtime() RETURNS TABLE(op_id integer, id_machine integer, employeeid integer, datetimestartop timestamp without time zone, datetimeendop timestamp without time zone, operatoroperatingtime interval)
    LANGUAGE plpgsql
    AS $$
BEGIN
    
RETURN QUERY select id_op_event, machine_id, employee_id, date_time_event_start, date_time_event_end, age(date_time_event_end, date_time_event_start)
from public.operator_events
where event_op_id = 2;

END ; $$;
 .   DROP FUNCTION public.operatoroperatingtime();
       public       marabout    false            �           1255    140208    parseunixtimestamp(real)    FUNCTION     �   CREATE FUNCTION public.parseunixtimestamp(real) RETURNS timestamp without time zone
    LANGUAGE sql
    AS $_$SELECT TIMESTAMP 'epoch' + $1 * INTERVAL '1 second'$_$;
 /   DROP FUNCTION public.parseunixtimestamp(real);
       public       marabout    false            �           1255    82839    repairtime()    FUNCTION     �  CREATE FUNCTION public.repairtime() RETURNS TABLE(ev_id integer, machineid integer, dateevstart timestamp without time zone, dateevend timestamp without time zone, repairtime interval)
    LANGUAGE plpgsql
    AS $$
BEGIN
    
RETURN QUERY select event_id, machine_id, date_time_event_start, date_time_event_end, age(date_time_event_end, date_time_event_start)
from public.machine_events
where event_id = 3;

END ; $$;
 #   DROP FUNCTION public.repairtime();
       public       marabout    false            �           1255    83942    revision_events()    FUNCTION     �  CREATE FUNCTION public.revision_events() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
 
 	INSERT INTO public.revision_events (machine_id, event_id, machine_evt_id, date_time_event_start, event_type, date_time_event_end, updated_at)
	 VALUES (NEW.machine_id, NEW.event_id, NEW.machine_evt_id, NEW.date_time_event_start, NEW.event_type, NEW.date_time_event_end, now());
 
 RETURN NEW;
END;

$$;
 (   DROP FUNCTION public.revision_events();
       public       marabout    false            �           1255    75195    revision_machines()    FUNCTION     �  CREATE FUNCTION public.revision_machines() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
 
 	INSERT INTO public.revision_machine (machine_label, machine_model, machine_id, machine_totalworkinghours, machine_startworkdate, machine_workingevt, machine_manufaclifetime, machine_productivity, machine_totalstitchcount, line_id, machine_totaluptime, machine_totaldowntime, sm_id, group_id, updated_at)
	VALUES (NEW.machine_label, NEW.machine_model, NEW.machine_id, NEW.machine_totalworkinghours, NEW.machine_startworkdate, NEW.machine_workingevt, NEW.machine_manufaclifetime, NEW.machine_productivity, NEW.machine_totalstitchcount, NEW.line_id, NEW.machine_totaluptime, NEW.machine_totaldowntime, NEW.sm_id, NEW.group_id, now());
 
 RETURN NEW;
END;
$$;
 *   DROP FUNCTION public.revision_machines();
       public       marabout    false            �           1255    91073    totalfailurecount()    FUNCTION       CREATE FUNCTION public.totalfailurecount() RETURNS TABLE(machineid integer, totalfailurecount bigint)
    LANGUAGE plpgsql
    AS $$

BEGIN

RETURN QUERY select machine_id, count(event_id)
from public.revision_events
where event_id = 4
Group by machine_id;

END ; $$;
 *   DROP FUNCTION public.totalfailurecount();
       public       marabout    false            �           1255    123748    totalworkinghours()    FUNCTION     P  CREATE FUNCTION public.totalworkinghours() RETURNS TABLE(machineid integer, totalworkinghours double precision)
    LANGUAGE plpgsql
    AS $$

BEGIN

RETURN QUERY select machine_id, SUM (extract (hour FROM age(date_time_event_end, date_time_event_start)))
from public.revision_events
where event_id = 6
Group by machine_id;

END ; $$;
 *   DROP FUNCTION public.totalworkinghours();
       public       marabout    false            �           1255    82853    uptime()    FUNCTION     �  CREATE FUNCTION public.uptime() RETURNS TABLE(ev_id integer, machineid integer, dateevstart timestamp without time zone, dateevend timestamp without time zone, uptime interval)
    LANGUAGE plpgsql
    AS $$
BEGIN
    
RETURN QUERY select event_id, machine_id, date_time_event_start, date_time_event_end, age(date_time_event_end, date_time_event_start)
from public.machine_events
where event_id = 6;

END ; $$;
    DROP FUNCTION public.uptime();
       public       marabout    false            $           1259    83324    import_logs    TABLE     �  CREATE TABLE public.import_logs (
    article character varying(100) DEFAULT NULL::character varying,
    ordre character varying(100) DEFAULT NULL::character varying,
    bundle character varying(100) DEFAULT NULL::character varying,
    status_import character varying(255) DEFAULT NULL::character varying,
    date_start character varying(255) DEFAULT NULL::character varying,
    date_end character varying(255) DEFAULT NULL::character varying,
    status_print integer,
    nb_carts character varying(45) DEFAULT NULL::character varying,
    bundle_imp integer,
    codebundle character varying(100) DEFAULT NULL::character varying,
    import_log_id integer NOT NULL,
    active text
);
    DROP TABLE public.import_logs;
       public         marabout    false            N           1259    83731      import_logs_import_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public."  import_logs_import_log_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."  import_logs_import_log_id_seq";
       public       marabout    false    292            6           0    0      import_logs_import_log_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public."  import_logs_import_log_id_seq" OWNED BY public.import_logs.import_log_id;
            public       marabout    false    334            �            1259    66252    boxes    TABLE     X  CREATE TABLE public.boxes (
    box_id integer NOT NULL,
    box_label text,
    box_macaddress text,
    current_versionid text,
    box_description text,
    enabled boolean,
    machine_id integer,
    break_status integer,
    break_statusblue integer,
    manufacturingdate date,
    updated_at date,
    app_versionstatus integer,
    next_versionid integer,
    deploymentdate date,
    site_id integer,
    line_id integer,
    repair_status text,
    bt_id integer,
    gw_id integer,
    box_uptime integer,
    box_access_point text,
    box_configuration_file integer,
    active text
);
    DROP TABLE public.boxes;
       public         marabout    false            �            1259    66250    Boxes1_Box_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Boxes1_Box_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Boxes1_Box_id_seq";
       public       marabout    false    222            7           0    0    Boxes1_Box_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public."Boxes1_Box_id_seq" OWNED BY public.boxes.box_id;
            public       marabout    false    221            �            1259    75223    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         marabout    false            	           1259    83094    articles    TABLE     �   CREATE TABLE public.articles (
    code character varying(45) DEFAULT NULL::character varying,
    label character varying(45),
    description character varying(128) DEFAULT NULL::character varying,
    article_id integer NOT NULL,
    active text
);
    DROP TABLE public.articles;
       public         marabout    false            L           1259    83671    article_article_id_seq    SEQUENCE     �   CREATE SEQUENCE public.article_article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.article_article_id_seq;
       public       marabout    false    265            8           0    0    article_article_id_seq    SEQUENCE OWNED BY     R   ALTER SEQUENCE public.article_article_id_seq OWNED BY public.articles.article_id;
            public       marabout    false    332            d           1259    123787    article_operation_templates    TABLE     �   CREATE TABLE public.article_operation_templates (
    article_operation_template_id integer NOT NULL,
    article_id integer,
    operation_template_id integer,
    active text
);
 /   DROP TABLE public.article_operation_templates;
       public         marabout    false            c           1259    123785 =   article_operation_templates_article_operation_template_id_seq    SEQUENCE     �   CREATE SEQUENCE public.article_operation_templates_article_operation_template_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 T   DROP SEQUENCE public.article_operation_templates_article_operation_template_id_seq;
       public       marabout    false    356            9           0    0 =   article_operation_templates_article_operation_template_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.article_operation_templates_article_operation_template_id_seq OWNED BY public.article_operation_templates.article_operation_template_id;
            public       marabout    false    355            �            1259    66309 	   box_types    TABLE     {   CREATE TABLE public.box_types (
    bt_id integer NOT NULL,
    bt_label text,
    bt_description text,
    active text
);
    DROP TABLE public.box_types;
       public         marabout    false            �            1259    74806    box_types_bt_id_seq    SEQUENCE     �   CREATE SEQUENCE public.box_types_bt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.box_types_bt_id_seq;
       public       marabout    false    227            :           0    0    box_types_bt_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.box_types_bt_id_seq OWNED BY public.box_types.bt_id;
            public       marabout    false    238                       1259    83115    breaks    TABLE       CREATE TABLE public.breaks (
    breaktype_id integer,
    break_id integer NOT NULL,
    active text,
    usersession_id integer,
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    push_time timestamp without time zone
);
    DROP TABLE public.breaks;
       public         marabout    false                       1259    83128    break_break_id_seq    SEQUENCE     �   CREATE SEQUENCE public.break_break_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.break_break_id_seq;
       public       marabout    false    267            ;           0    0    break_break_id_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.break_break_id_seq OWNED BY public.breaks.break_id;
            public       marabout    false    269            
           1259    83113    break_id_seq    SEQUENCE     u   CREATE SEQUENCE public.break_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.break_id_seq;
       public       marabout    false                       1259    83139    break_types    TABLE     �   CREATE TABLE public.break_types (
    label_break character varying(100),
    num_break character varying(100),
    break_type_id integer NOT NULL,
    active text,
    category_id integer,
    need_validation text
);
    DROP TABLE public.break_types;
       public         marabout    false            M           1259    83706    break_type_break_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.break_type_break_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.break_type_break_type_id_seq;
       public       marabout    false    270            <           0    0    break_type_break_type_id_seq    SEQUENCE OWNED BY     ^   ALTER SEQUENCE public.break_type_break_type_id_seq OWNED BY public.break_types.break_type_id;
            public       marabout    false    333            `           1259    123723    break_type_categories    TABLE     �   CREATE TABLE public.break_type_categories (
    category_id integer NOT NULL,
    category_label text,
    active text,
    category_code integer
);
 )   DROP TABLE public.break_type_categories;
       public         marabout    false            _           1259    123721 %   break_type_categories_category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.break_type_categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.break_type_categories_category_id_seq;
       public       marabout    false    352            =           0    0 %   break_type_categories_category_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.break_type_categories_category_id_seq OWNED BY public.break_type_categories.category_id;
            public       marabout    false    351                       1259    83126    break_type_id_seq    SEQUENCE     z   CREATE SEQUENCE public.break_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.break_type_id_seq;
       public       marabout    false                       1259    83146    bundles    TABLE       CREATE TABLE public.bundles (
    operation_groupe_id integer,
    code_bundle character varying(255),
    num_bundle character varying(255),
    variant1 character varying(45) DEFAULT NULL::character varying,
    variant2 character varying(45) DEFAULT NULL::character varying,
    variant3 character varying(45) DEFAULT NULL::character varying,
    size1 character varying(45) DEFAULT NULL::character varying,
    size2 character varying(45) DEFAULT NULL::character varying,
    cuo_id character varying(45) DEFAULT NULL::character varying,
    cuo_pos character varying(45) DEFAULT NULL::character varying,
    expr1 character varying(45) DEFAULT NULL::character varying,
    zu_tc_man3 character varying(45) DEFAULT NULL::character varying,
    zu_tc_man2 character varying(45) DEFAULT NULL::character varying,
    zu_tc_man4 character varying(45) DEFAULT NULL::character varying,
    zu_tc_man5 character varying(45) DEFAULT NULL::character varying,
    zu_tc_man6 character varying(45) DEFAULT NULL::character varying,
    bd_refid integer,
    bundle_qte integer,
    card_pcs character varying(255) DEFAULT NULL::character varying,
    created_at character varying(255) DEFAULT NULL::character varying,
    updated_at character varying(255) DEFAULT NULL::character varying,
    tag character varying(45) DEFAULT NULL::character varying,
    pushed_to_printer character varying(1) DEFAULT NULL::character varying,
    bundle_id integer NOT NULL,
    printer_id integer,
    active text,
    header_ref text,
    order_id integer
);
    DROP TABLE public.bundles;
       public         marabout    false                       1259    83174    bundle_bundle_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bundle_bundle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.bundle_bundle_id_seq;
       public       marabout    false    272            >           0    0    bundle_bundle_id_seq    SEQUENCE OWNED BY     N   ALTER SEQUENCE public.bundle_bundle_id_seq OWNED BY public.bundles.bundle_id;
            public       marabout    false    274                       1259    83185    bundle_carts    TABLE     �   CREATE TABLE public.bundle_carts (
    bundle_id integer,
    cart_id integer,
    affected_at character varying(255) DEFAULT NULL::character varying,
    nbcarts integer,
    bundle_cart_id integer NOT NULL,
    active text
);
     DROP TABLE public.bundle_carts;
       public         marabout    false                       1259    83218    bundle_cart_bundle_cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bundle_cart_bundle_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.bundle_cart_bundle_cart_id_seq;
       public       marabout    false    275            ?           0    0    bundle_cart_bundle_cart_id_seq    SEQUENCE OWNED BY     b   ALTER SEQUENCE public.bundle_cart_bundle_cart_id_seq OWNED BY public.bundle_carts.bundle_cart_id;
            public       marabout    false    281                       1259    83172    bundle_cart_id_seq    SEQUENCE     {   CREATE SEQUENCE public.bundle_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.bundle_cart_id_seq;
       public       marabout    false                       1259    83143    bundle_id_seq    SEQUENCE     v   CREATE SEQUENCE public.bundle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.bundle_id_seq;
       public       marabout    false                       1259    83192    carts    TABLE       CREATE TABLE public.carts (
    rfid_cart character varying(45) DEFAULT NULL::character varying,
    filename character varying(255) DEFAULT NULL::character varying,
    message character varying(255) DEFAULT NULL::character varying,
    created_at character varying(255) DEFAULT NULL::character varying,
    updated_at character varying(255) DEFAULT NULL::character varying,
    print_start timestamp(0) without time zone DEFAULT NULL::timestamp without time zone,
    cart_id integer NOT NULL,
    active text
);
    DROP TABLE public.carts;
       public         marabout    false                       1259    83226    cart_cart_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.cart_cart_id_seq;
       public       marabout    false    277            @           0    0    cart_cart_id_seq    SEQUENCE OWNED BY     F   ALTER SEQUENCE public.cart_cart_id_seq OWNED BY public.carts.cart_id;
            public       marabout    false    282                       1259    83190    cart_id_seq    SEQUENCE     t   CREATE SEQUENCE public.cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.cart_id_seq;
       public       marabout    false                       1259    83207    cart_pending_operations    TABLE     �  CREATE TABLE public.cart_pending_operations (
    operation_id integer,
    bundle_id integer,
    finished integer,
    stitch_count integer,
    thread_cuts integer,
    "time" character varying(255) DEFAULT NULL::character varying,
    quantity integer,
    machine_id integer,
    datereadbundle character varying(255) DEFAULT NULL::character varying,
    cart_pending_operation_id integer NOT NULL,
    active text,
    datestart timestamp without time zone,
    dateend timestamp without time zone
);
 +   DROP TABLE public.cart_pending_operations;
       public         marabout    false                       1259    83237 4   cart_pending_operation_cart_pending_operation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_pending_operation_cart_pending_operation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 K   DROP SEQUENCE public.cart_pending_operation_cart_pending_operation_id_seq;
       public       marabout    false    279            A           0    0 4   cart_pending_operation_cart_pending_operation_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.cart_pending_operation_cart_pending_operation_id_seq OWNED BY public.cart_pending_operations.cart_pending_operation_id;
            public       marabout    false    283                       1259    83205    cart_pending_operation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_pending_operation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.cart_pending_operation_id_seq;
       public       marabout    false                       1259    83249    cart_pending_sessions    TABLE     �  CREATE TABLE public.cart_pending_sessions (
    session_id integer,
    status integer,
    stitch_count integer,
    thread_cuts integer,
    quantity integer,
    cart_pendingoperation_id integer,
    created_at character varying(255) DEFAULT NULL::character varying,
    updated_at character varying(255) DEFAULT NULL::character varying,
    break_id integer,
    time_break_blue integer,
    cart_pending_session_id integer NOT NULL,
    active text,
    "time" integer,
    starttime text,
    endtime text,
    system_quantity integer,
    work_quality text,
    started_at timestamp without time zone,
    start_time timestamp without time zone,
    end_time timestamp without time zone
);
 )   DROP TABLE public.cart_pending_sessions;
       public         marabout    false                       1259    83261 0   cart_pending_session_cart_pending_session_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_pending_session_cart_pending_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 G   DROP SEQUENCE public.cart_pending_session_cart_pending_session_id_seq;
       public       marabout    false    284            B           0    0 0   cart_pending_session_cart_pending_session_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.cart_pending_session_cart_pending_session_id_seq OWNED BY public.cart_pending_sessions.cart_pending_session_id;
            public       marabout    false    286                       1259    83216    cart_pending_session_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_pending_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.cart_pending_session_id_seq;
       public       marabout    false                       1259    83272    cart_reopened_operations    TABLE     "  CREATE TABLE public.cart_reopened_operations (
    user_id integer,
    bundle_id integer,
    cart_id integer,
    operation_id integer,
    box_id integer,
    status integer,
    finished integer,
    stitch_count integer,
    thread_cuts integer,
    "time" character varying(255) DEFAULT NULL::character varying,
    quantity integer,
    datestart character varying(255) DEFAULT NULL::character varying,
    dateend character varying(255) DEFAULT NULL::character varying,
    cart_reopened_operation_id integer NOT NULL,
    active text
);
 ,   DROP TABLE public.cart_reopened_operations;
       public         marabout    false            !           1259    83284 6   cart_reopened_operation_cart_reopened_operation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_reopened_operation_cart_reopened_operation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 M   DROP SEQUENCE public.cart_reopened_operation_cart_reopened_operation_id_seq;
       public       marabout    false    287            C           0    0 6   cart_reopened_operation_cart_reopened_operation_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.cart_reopened_operation_cart_reopened_operation_id_seq OWNED BY public.cart_reopened_operations.cart_reopened_operation_id;
            public       marabout    false    289                       1259    83259    cart_reopened_operation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_reopened_operation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.cart_reopened_operation_id_seq;
       public       marabout    false            �            1259    57348    lines    TABLE     �   CREATE TABLE public.lines (
    line_id integer NOT NULL,
    line_label text,
    site_id integer,
    active text,
    line_description text
);
    DROP TABLE public.lines;
       public         marabout    false            �            1259    57346    chains_id_seq    SEQUENCE     �   CREATE SEQUENCE public.chains_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.chains_id_seq;
       public       marabout    false    219            D           0    0    chains_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.chains_id_seq OWNED BY public.lines.line_id;
            public       marabout    false    218            �            1259    57362    client_user    TABLE     z   CREATE TABLE public.client_user (
    id integer NOT NULL,
    client_id integer,
    user_id integer,
    active text
);
    DROP TABLE public.client_user;
       public         marabout    false            �            1259    24669    clients    TABLE     W  CREATE TABLE public.clients (
    client_id integer NOT NULL,
    client_label text,
    client_address text,
    client_phonenumber numeric,
    client_email text,
    client_technicalcontact text,
    client_salescontact text,
    client_fax numeric,
    client_picpath text,
    client_city text,
    country_id integer,
    active text
);
    DROP TABLE public.clients;
       public         marabout    false            �            1259    24667    clients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.clients_id_seq;
       public       marabout    false    197            E           0    0    clients_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.client_id;
            public       marabout    false    196            �            1259    40975 	   countries    TABLE     �   CREATE TABLE public.countries (
    country_id integer NOT NULL,
    country_name text,
    country_code text,
    active text
);
    DROP TABLE public.countries;
       public         marabout    false            �            1259    40973    countries_id_seq    SEQUENCE     �   CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.countries_id_seq;
       public       marabout    false    217            F           0    0    countries_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.country_id;
            public       marabout    false    216            f           1259    123808    machine_sessions    TABLE     �   CREATE TABLE public.machine_sessions (
    machine_session_id integer NOT NULL,
    time_in timestamp(0) without time zone,
    time_out timestamp(0) without time zone,
    machine_id integer
);
 $   DROP TABLE public.machine_sessions;
       public         marabout    false            �            1259    32772    machines    TABLE     A  CREATE TABLE public.machines (
    machine_id integer NOT NULL,
    machine_label text,
    machine_model text,
    machine_startworkdate date,
    machine_workingevt text,
    machine_manufaclifetime numeric,
    machine_productivity numeric,
    machine_totalstitchcount numeric,
    line_id integer,
    machine_totaluptime numeric(4,0),
    sm_id integer,
    machine_totalworkinghours numeric(4,0),
    active text,
    group_id integer,
    machine_totaldowntime numeric,
    rfid_cart character varying(100),
    machine_type_id integer,
    machine_group_id integer
);
    DROP TABLE public.machines;
       public         marabout    false            �           1259    140732 
   downtimeml    VIEW     .  CREATE VIEW public.downtimeml AS
 SELECT machines.machine_id AS machineidm,
    machine_sessions.machine_id,
    machines.machine_startworkdate,
    machine_sessions.time_out,
    machine_sessions.time_in,
    (date_part('epoch'::text, (age((CURRENT_DATE)::timestamp with time zone, (machines.machine_startworkdate)::timestamp with time zone) - age(machine_sessions.time_out, machine_sessions.time_in))) / (3600)::double precision) AS downtime
   FROM public.machines,
    public.machine_sessions
  WHERE (machines.machine_id = machine_sessions.machine_id);
    DROP VIEW public.downtimeml;
       public       marabout    false    205    358    205    358    358            �            1259    74898    efiles    TABLE     ^  CREATE TABLE public.efiles (
    file_id integer NOT NULL,
    file_name text,
    original_name text,
    file_title text,
    active text,
    uri text,
    file_extension text,
    file_type text,
    file_size integer,
    doc_type text,
    picture text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);
    DROP TABLE public.efiles;
       public         marabout    false            �            1259    74896    efile_file_id_seq    SEQUENCE     �   CREATE SEQUENCE public.efile_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.efile_file_id_seq;
       public       marabout    false    246            G           0    0    efile_file_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.efile_file_id_seq OWNED BY public.efiles.file_id;
            public       marabout    false    245            �            1259    32911 	   employees    TABLE     �  CREATE TABLE public.employees (
    emp_id integer NOT NULL,
    emp_name text,
    emp_lastname text,
    emp_gender text,
    emp_start_working_date date,
    emp_address text,
    emp_city text,
    job_id integer NOT NULL,
    emp_age integer,
    emp_rfid text,
    emp_lastlogindate date,
    emp_email text,
    group_id integer,
    empstatus_id integer,
    profile_image_id integer,
    active text,
    emp_matricule integer,
    skill_id integer
);
    DROP TABLE public.employees;
       public         marabout    false            �            1259    32909    employees_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.employees_id_seq;
       public       marabout    false    209            H           0    0    employees_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.emp_id;
            public       marabout    false    208            �            1259    33317    employees_task_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employees_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.employees_task_id_seq;
       public       marabout    false    209            I           0    0    employees_task_id_seq    SEQUENCE OWNED BY     N   ALTER SEQUENCE public.employees_task_id_seq OWNED BY public.employees.job_id;
            public       marabout    false    210            �            1259    33452    erp_sections    TABLE     �   CREATE TABLE public.erp_sections (
    esec_id integer NOT NULL,
    esec_label text,
    esec_userlevel integer,
    active text
);
     DROP TABLE public.erp_sections;
       public         marabout    false            �            1259    82811    events    TABLE     T   CREATE TABLE public.events (
    event_id integer NOT NULL,
    event_label text
);
    DROP TABLE public.events;
       public         marabout    false            �            1259    82809    events_event_id_seq    SEQUENCE     �   CREATE SEQUENCE public.events_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.events_event_id_seq;
       public       marabout    false    254            J           0    0    events_event_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.events_event_id_seq OWNED BY public.events.event_id;
            public       marabout    false    253                       1259    83037 	   events_ms    TABLE     _   CREATE TABLE public.events_ms (
    events_ms_id integer NOT NULL,
    events_ms_label text
);
    DROP TABLE public.events_ms;
       public         marabout    false                       1259    83035    events_ms_events_ms_id_seq    SEQUENCE     �   CREATE SEQUENCE public.events_ms_events_ms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.events_ms_events_ms_id_seq;
       public       marabout    false    264            K           0    0    events_ms_events_ms_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.events_ms_events_ms_id_seq OWNED BY public.events_ms.events_ms_id;
            public       marabout    false    263                       1259    82997 
   events_ops    TABLE     ^   CREATE TABLE public.events_ops (
    id_event_op integer NOT NULL,
    event_op_label text
);
    DROP TABLE public.events_ops;
       public         marabout    false                       1259    82995    events_ops_id_event_op_seq    SEQUENCE     �   CREATE SEQUENCE public.events_ops_id_event_op_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.events_ops_id_event_op_seq;
       public       marabout    false    260            L           0    0    events_ops_id_event_op_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.events_ops_id_event_op_seq OWNED BY public.events_ops.id_event_op;
            public       marabout    false    259            �            1259    82800    machine_events    TABLE     2  CREATE TABLE public.machine_events (
    machine_evt_id integer NOT NULL,
    date_time_event_start timestamp without time zone,
    event_type text,
    event_id integer,
    cause text,
    machine_id integer,
    date_time_event_end timestamp without time zone,
    description text,
    active text
);
 "   DROP TABLE public.machine_events;
       public         marabout    false            �           1259    140722    failuretime    VIEW     R  CREATE VIEW public.failuretime AS
 SELECT machine_events.event_id,
    machine_events.machine_id,
    machine_events.date_time_event_start,
    machine_events.date_time_event_end,
    age(machine_events.date_time_event_end, machine_events.date_time_event_start) AS age
   FROM public.machine_events
  WHERE (machine_events.event_id = 4);
    DROP VIEW public.failuretime;
       public       marabout    false    252    252    252    252            �            1259    66269    gateway_types    TABLE     h   CREATE TABLE public.gateway_types (
    gwt_id integer NOT NULL,
    gwt_label text,
    active text
);
 !   DROP TABLE public.gateway_types;
       public         marabout    false            �            1259    74745    gateway_types_gwt_id_seq    SEQUENCE     �   CREATE SEQUENCE public.gateway_types_gwt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.gateway_types_gwt_id_seq;
       public       marabout    false    224            M           0    0    gateway_types_gwt_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.gateway_types_gwt_id_seq OWNED BY public.gateway_types.gwt_id;
            public       marabout    false    237            �            1259    66261    gateways    TABLE     8  CREATE TABLE public.gateways (
    gw_label text,
    gw_address_mac_in_bound text,
    gw_address_mac_out_bound text,
    gw_description text,
    gw_ip text,
    gw_deployment_date date,
    site_id integer,
    gwt_id integer,
    gw_id integer NOT NULL,
    configuration_file_id integer,
    active text
);
    DROP TABLE public.gateways;
       public         marabout    false            �            1259    74830    gateways_gw_id_seq    SEQUENCE     �   CREATE SEQUENCE public.gateways_gw_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.gateways_gw_id_seq;
       public       marabout    false    223            N           0    0    gateways_gw_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.gateways_gw_id_seq OWNED BY public.gateways.gw_id;
            public       marabout    false    239                        1259    83282    gpdwork_id_seq    SEQUENCE     w   CREATE SEQUENCE public.gpdwork_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.gpdwork_id_seq;
       public       marabout    false            "           1259    83295    gpdworks    TABLE       CREATE TABLE public.gpdworks (
    orderid integer,
    ordercode character varying(50) DEFAULT NULL::character varying,
    ordernr character varying(50) DEFAULT NULL::character varying,
    modelid integer,
    modelcode character varying(50) DEFAULT NULL::character varying,
    opid integer,
    opcode character varying(50) DEFAULT NULL::character varying,
    lopname character varying(255) DEFAULT NULL::character varying,
    machtypeid integer,
    machtypecode character varying(45) DEFAULT NULL::character varying,
    quantity character varying(45) DEFAULT NULL::character varying,
    sam character varying(45) DEFAULT NULL::character varying,
    opgroup character varying(45) DEFAULT NULL::character varying,
    gpdwork_id integer NOT NULL,
    active text
);
    DROP TABLE public.gpdworks;
       public         marabout    false            P           1259    83829    gpdworks_gpdwork_id_seq    SEQUENCE     �   CREATE SEQUENCE public.gpdworks_gpdwork_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.gpdworks_gpdwork_id_seq;
       public       marabout    false    290            O           0    0    gpdworks_gpdwork_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.gpdworks_gpdwork_id_seq OWNED BY public.gpdworks.gpdwork_id;
            public       marabout    false    336            �            1259    24719    groups    TABLE     �   CREATE TABLE public.groups (
    group_id integer NOT NULL,
    group_label text,
    site_id integer NOT NULL,
    group_description text,
    active text
);
    DROP TABLE public.groups;
       public         marabout    false            �            1259    24717    groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.groups_id_seq;
       public       marabout    false    201            P           0    0    groups_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.group_id;
            public       marabout    false    200            �            1259    33386    groups_site_id_seq    SEQUENCE     �   CREATE SEQUENCE public.groups_site_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.groups_site_id_seq;
       public       marabout    false    201            Q           0    0    groups_site_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.groups_site_id_seq OWNED BY public.groups.site_id;
            public       marabout    false    211            �            1259    75268    has_permissions    TABLE     �   CREATE TABLE public.has_permissions (
    has_permissions_profild_id integer,
    has_permissions_permission_id integer,
    has_permissions_id integer
);
 #   DROP TABLE public.has_permissions;
       public         marabout    false            �           1259    173921    has_permissions_id_seq    SEQUENCE        CREATE SEQUENCE public.has_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.has_permissions_id_seq;
       public       marabout    false    250            R           0    0    has_permissions_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.has_permissions_id_seq OWNED BY public.has_permissions.has_permissions_id;
            public       marabout    false    408            #           1259    83311    import_log_id_seq    SEQUENCE     z   CREATE SEQUENCE public.import_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.import_log_id_seq;
       public       marabout    false            �            1259    32884    jobs    TABLE     x   CREATE TABLE public.jobs (
    job_id integer NOT NULL,
    job_name text,
    job_description text,
    active text
);
    DROP TABLE public.jobs;
       public         marabout    false            �            1259    82798 !   machine_events_machine_evt_id_seq    SEQUENCE     �   CREATE SEQUENCE public.machine_events_machine_evt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.machine_events_machine_evt_id_seq;
       public       marabout    false    252            S           0    0 !   machine_events_machine_evt_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.machine_events_machine_evt_id_seq OWNED BY public.machine_events.machine_evt_id;
            public       marabout    false    251            X           1259    90976    machine_groups    TABLE     �   CREATE TABLE public.machine_groups (
    machine_group_id integer NOT NULL,
    machine_id integer,
    group_id integer,
    active text
);
 "   DROP TABLE public.machine_groups;
       public         marabout    false            W           1259    90974 #   machine_groups_machine_group_id_seq    SEQUENCE     �   CREATE SEQUENCE public.machine_groups_machine_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.machine_groups_machine_group_id_seq;
       public       marabout    false    344            T           0    0 #   machine_groups_machine_group_id_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.machine_groups_machine_group_id_seq OWNED BY public.machine_groups.machine_group_id;
            public       marabout    false    343            t           1259    140289    machine_light_status_sessions    TABLE     �   CREATE TABLE public.machine_light_status_sessions (
    machine_light_status_session_id integer NOT NULL,
    light_status_id integer,
    start text,
    "end" text,
    metas text,
    active text
);
 1   DROP TABLE public.machine_light_status_sessions;
       public         marabout    false            s           1259    140287 ?   machine_light_status_sessions_machine_light_status_session__seq    SEQUENCE     �   CREATE SEQUENCE public.machine_light_status_sessions_machine_light_status_session__seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 V   DROP SEQUENCE public.machine_light_status_sessions_machine_light_status_session__seq;
       public       marabout    false    372            U           0    0 ?   machine_light_status_sessions_machine_light_status_session__seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.machine_light_status_sessions_machine_light_status_session__seq OWNED BY public.machine_light_status_sessions.machine_light_status_session_id;
            public       marabout    false    371            h           1259    123822    machine_session_operations    TABLE     6  CREATE TABLE public.machine_session_operations (
    machine_sess_op_id integer NOT NULL,
    stitchcount numeric,
    quantity numeric,
    time_in timestamp(0) without time zone,
    time_out timestamp(0) without time zone,
    user_op_session integer,
    machine_sess_id integer,
    machine_id integer
);
 .   DROP TABLE public.machine_session_operations;
       public         marabout    false            g           1259    123820 1   machine_session_operations_machine_sess_op_id_seq    SEQUENCE     �   CREATE SEQUENCE public.machine_session_operations_machine_sess_op_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 H   DROP SEQUENCE public.machine_session_operations_machine_sess_op_id_seq;
       public       marabout    false    360            V           0    0 1   machine_session_operations_machine_sess_op_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.machine_session_operations_machine_sess_op_id_seq OWNED BY public.machine_session_operations.machine_sess_op_id;
            public       marabout    false    359            e           1259    123806 '   machine_sessions_machine_session_id_seq    SEQUENCE     �   CREATE SEQUENCE public.machine_sessions_machine_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 >   DROP SEQUENCE public.machine_sessions_machine_session_id_seq;
       public       marabout    false    358            W           0    0 '   machine_sessions_machine_session_id_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public.machine_sessions_machine_session_id_seq OWNED BY public.machine_sessions.machine_session_id;
            public       marabout    false    357            ^           1259    99151    machine_types    TABLE     �   CREATE TABLE public.machine_types (
    machine_type_id integer NOT NULL,
    oil_change text,
    general_revision text,
    other_revision text,
    machine_brand text,
    type text,
    code text,
    model text,
    active text
);
 !   DROP TABLE public.machine_types;
       public         marabout    false            ]           1259    99149 !   machine_types_machine_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.machine_types_machine_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.machine_types_machine_type_id_seq;
       public       marabout    false    350            X           0    0 !   machine_types_machine_type_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.machine_types_machine_type_id_seq OWNED BY public.machine_types.machine_type_id;
            public       marabout    false    349            S           1259    83922    revision_events    TABLE     A  CREATE TABLE public.revision_events (
    id_revision integer NOT NULL,
    machine_id integer,
    date_time_event_start timestamp without time zone,
    event_type text,
    event_id integer,
    date_time_event_end timestamp without time zone,
    updated_at timestamp without time zone,
    machine_evt_id integer
);
 #   DROP TABLE public.revision_events;
       public         marabout    false            �            1259    75186    revision_machine    TABLE       CREATE TABLE public.revision_machine (
    revision_id integer NOT NULL,
    machine_id integer,
    machine_model text,
    machine_startworkdate date,
    machine_workingevt text,
    machine_manufaclifetime numeric,
    machine_productivity numeric,
    machine_totalstitchcount numeric,
    line_id integer,
    machine_totaluptime numeric(4,0),
    sm_id integer,
    group_id integer,
    machine_totalworkinghours numeric(4,0),
    machine_label text,
    updated_at timestamp without time zone,
    machine_totaldowntime numeric
);
 $   DROP TABLE public.revision_machine;
       public         marabout    false            �           1259    140829    machinefailureeventshistory    VIEW     c  CREATE VIEW public.machinefailureeventshistory AS
 SELECT rm.revision_id AS revisionid,
    rm.machine_id AS machid,
    rm.machine_model AS machinemodel,
    rm.machine_startworkdate AS machinestartworkdate,
    rm.machine_workingevt AS machineworkingevt,
    rm.machine_manufaclifetime AS machinemanufaclifetime,
    rm.machine_productivity AS machineproductivity,
    rm.machine_totalstitchcount AS machinetotalstitchcount,
    rm.line_id AS lineid,
    rm.machine_totaluptime AS machinetotaluptime,
    rm.sm_id AS smid,
    rm.group_id AS groupid,
    rm.machine_totalworkinghours AS machinetotalworkinghours,
    rm.machine_label AS machinelabel,
    rm.updated_at AS updatedat,
    rm.machine_totaldowntime AS machinetotaldowntime,
    re.id_revision AS rev_id,
    re.machine_id AS machevid,
    re.date_time_event_start AS datetimeeventstart,
    re.event_type AS eventtype,
    re.event_id AS eventid,
    re.date_time_event_end AS datetimeeventend,
    re.updated_at,
    re.machine_evt_id AS machineevid
   FROM public.revision_machine rm,
    public.revision_events re
  WHERE (rm.machine_id = re.machine_id);
 .   DROP VIEW public.machinefailureeventshistory;
       public       marabout    false    248    248    248    248    248    248    248    248    248    248    248    339    339    339    339    339    339    248    248    339    339    248    248    248            �            1259    32770    machines_id_seq    SEQUENCE     �   CREATE SEQUENCE public.machines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.machines_id_seq;
       public       marabout    false    205            Y           0    0    machines_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.machines_id_seq OWNED BY public.machines.machine_id;
            public       marabout    false    204            �           1259    140650    maintenance_feeds    TABLE     �  CREATE TABLE public.maintenance_feeds (
    duration integer,
    department_id integer,
    repared_by integer,
    feed_description text,
    active text,
    usersession_id integer,
    finished integer,
    maintenance_feed_id integer NOT NULL,
    maintenance_task_id integer,
    maintenance_template_id integer,
    status_maintenance_id integer,
    started_at timestamp without time zone,
    finished_at timestamp without time zone
);
 %   DROP TABLE public.maintenance_feeds;
       public         marabout    false            �           1259    164807 )   maintenance_feeds_maintenance_feed_id_seq    SEQUENCE     �   CREATE SEQUENCE public.maintenance_feeds_maintenance_feed_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE public.maintenance_feeds_maintenance_feed_id_seq;
       public       marabout    false    385            Z           0    0 )   maintenance_feeds_maintenance_feed_id_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE public.maintenance_feeds_maintenance_feed_id_seq OWNED BY public.maintenance_feeds.maintenance_feed_id;
            public       marabout    false    403                       1259    140634    maintenance_tasks    TABLE     �  CREATE TABLE public.maintenance_tasks (
    created_at timestamp without time zone,
    machine_id integer,
    department_id integer,
    bug_description text,
    owner_id integer,
    active text,
    created_by integer,
    maintenance_task_id integer NOT NULL,
    maintenance_status_id integer,
    source text,
    maintenance_template_id integer,
    repared_by integer,
    repared_at timestamp without time zone
);
 %   DROP TABLE public.maintenance_tasks;
       public         marabout    false            �           1259    164819 )   maintenance_tasks_maintenance_task_id_seq    SEQUENCE     �   CREATE SEQUENCE public.maintenance_tasks_maintenance_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE public.maintenance_tasks_maintenance_task_id_seq;
       public       marabout    false    383            [           0    0 )   maintenance_tasks_maintenance_task_id_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE public.maintenance_tasks_maintenance_task_id_seq OWNED BY public.maintenance_tasks.maintenance_task_id;
            public       marabout    false    404            �           1259    140806    maintenance_templates    TABLE     �   CREATE TABLE public.maintenance_templates (
    label text,
    active text,
    departement_id integer,
    maintenance_template_id integer NOT NULL
);
 )   DROP TABLE public.maintenance_templates;
       public         marabout    false            �           1259    164835 1   maintenance_templates_maintenance_template_id_seq    SEQUENCE     �   CREATE SEQUENCE public.maintenance_templates_maintenance_template_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 H   DROP SEQUENCE public.maintenance_templates_maintenance_template_id_seq;
       public       marabout    false    392            \           0    0 1   maintenance_templates_maintenance_template_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.maintenance_templates_maintenance_template_id_seq OWNED BY public.maintenance_templates.maintenance_template_id;
            public       marabout    false    405                       1259    83026    mechanic_events    TABLE     W  CREATE TABLE public.mechanic_events (
    mechanic_events_id integer NOT NULL,
    date_time_event_start timestamp without time zone,
    date_time_event_end timestamp without time zone,
    event_type text,
    cause text,
    machine_id integer,
    job_id integer,
    events_ms_id integer,
    employee_id integer,
    description text
);
 #   DROP TABLE public.mechanic_events;
       public         marabout    false                       1259    83024 &   mechanic_events_mechanic_events_id_seq    SEQUENCE     �   CREATE SEQUENCE public.mechanic_events_mechanic_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 =   DROP SEQUENCE public.mechanic_events_mechanic_events_id_seq;
       public       marabout    false    262            ]           0    0 &   mechanic_events_mechanic_events_id_seq    SEQUENCE OWNED BY     q   ALTER SEQUENCE public.mechanic_events_mechanic_events_id_seq OWNED BY public.mechanic_events.mechanic_events_id;
            public       marabout    false    261            �            1259    33450    menus_id_seq    SEQUENCE     �   CREATE SEQUENCE public.menus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.menus_id_seq;
       public       marabout    false    215            ^           0    0    menus_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.menus_id_seq OWNED BY public.erp_sections.esec_id;
            public       marabout    false    214            z           1259    140532    notification_reads    TABLE     �   CREATE TABLE public.notification_reads (
    employee_id integer,
    read text,
    date_read timestamp without time zone,
    active text,
    notification_read_id integer NOT NULL,
    notification_id integer
);
 &   DROP TABLE public.notification_reads;
       public         marabout    false            �           1259    164691 +   notification_reads_notification_read_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notification_reads_notification_read_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE public.notification_reads_notification_read_id_seq;
       public       marabout    false    378            _           0    0 +   notification_reads_notification_read_id_seq    SEQUENCE OWNED BY     {   ALTER SEQUENCE public.notification_reads_notification_read_id_seq OWNED BY public.notification_reads.notification_read_id;
            public       marabout    false    396            y           1259    140489    notifications    TABLE     >  CREATE TABLE public.notifications (
    message text,
    created_at timestamp without time zone,
    created_by integer,
    employee_id integer,
    box_id integer,
    machine_id integer,
    bundle_id integer,
    operation_id integer,
    line_id integer,
    active text,
    notification_id integer NOT NULL
);
 !   DROP TABLE public.notifications;
       public         marabout    false            �           1259    164702 !   notifications_notification_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notifications_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.notifications_notification_id_seq;
       public       marabout    false    377            `           0    0 !   notifications_notification_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.notifications_notification_id_seq OWNED BY public.notifications.notification_id;
            public       marabout    false    397            v           1259    140323    observations    TABLE     �   CREATE TABLE public.observations (
    label text,
    created_at timestamp without time zone,
    created_by text,
    active text,
    observation_id integer NOT NULL
);
     DROP TABLE public.observations;
       public         marabout    false            �           1259    164770    observations_observation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.observations_observation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.observations_observation_id_seq;
       public       marabout    false    374            a           0    0    observations_observation_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.observations_observation_id_seq OWNED BY public.observations.observation_id;
            public       marabout    false    401            '           1259    83358    operation_groupe_id_seq    SEQUENCE     �   CREATE SEQUENCE public.operation_groupe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.operation_groupe_id_seq;
       public       marabout    false            (           1259    83368    operation_groupes    TABLE       CREATE TABLE public.operation_groupes (
    label character varying(45) DEFAULT NULL::character varying,
    description character varying(45) DEFAULT NULL::character varying,
    active text,
    operation_groupe_id integer NOT NULL,
    order_id integer
);
 %   DROP TABLE public.operation_groupes;
       public         marabout    false            Q           1259    83865 )   operation_groupes_operation_groupe_id_seq    SEQUENCE     �   CREATE SEQUENCE public.operation_groupes_operation_groupe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE public.operation_groupes_operation_groupe_id_seq;
       public       marabout    false    296            b           0    0 )   operation_groupes_operation_groupe_id_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE public.operation_groupes_operation_groupe_id_seq OWNED BY public.operation_groupes.operation_groupe_id;
            public       marabout    false    337            %           1259    83339    operation_id_seq    SEQUENCE     y   CREATE SEQUENCE public.operation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.operation_id_seq;
       public       marabout    false            b           1259    123766    operation_templates    TABLE       CREATE TABLE public.operation_templates (
    operation_template_id integer NOT NULL,
    label text,
    op_code text,
    description text,
    machine_type_id integer,
    active text,
    "time" double precision,
    "accMinPrice" double precision,
    with_subsequence boolean
);
 '   DROP TABLE public.operation_templates;
       public         marabout    false            a           1259    123764 -   operation_templates_operation_template_id_seq    SEQUENCE     �   CREATE SEQUENCE public.operation_templates_operation_template_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 D   DROP SEQUENCE public.operation_templates_operation_template_id_seq;
       public       marabout    false    354            c           0    0 -   operation_templates_operation_template_id_seq    SEQUENCE OWNED BY        ALTER SEQUENCE public.operation_templates_operation_template_id_seq OWNED BY public.operation_templates.operation_template_id;
            public       marabout    false    353            &           1259    83353 
   operations    TABLE     �  CREATE TABLE public.operations (
    machine_groupe_id integer,
    machine_type_id integer,
    label character varying(45),
    op_code character varying(45),
    description character varying(70) DEFAULT NULL::character varying,
    "time" double precision,
    accminprice double precision,
    operation_id integer NOT NULL,
    active text,
    bundle_id integer,
    line_id integer,
    quantity integer
);
    DROP TABLE public.operations;
       public         marabout    false            O           1259    83748    operations_operation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.operations_operation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.operations_operation_id_seq;
       public       marabout    false    294            d           0    0    operations_operation_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.operations_operation_id_seq OWNED BY public.operations.operation_id;
            public       marabout    false    335                       1259    82986    operator_events    TABLE     O  CREATE TABLE public.operator_events (
    id_op_event integer NOT NULL,
    date_time_event_start timestamp without time zone,
    date_time_event_end timestamp without time zone,
    event_type text,
    cause text,
    description text,
    event_op_id integer,
    machine_id integer,
    job_id integer,
    employee_id integer
);
 #   DROP TABLE public.operator_events;
       public         marabout    false                       1259    82984    operator_events_id_op_event_seq    SEQUENCE     �   CREATE SEQUENCE public.operator_events_id_op_event_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.operator_events_id_op_event_seq;
       public       marabout    false    258            e           0    0    operator_events_id_op_event_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.operator_events_id_op_event_seq OWNED BY public.operator_events.id_op_event;
            public       marabout    false    257            )           1259    83382    operatorproductivity_id_seq    SEQUENCE     �   CREATE SEQUENCE public.operatorproductivity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.operatorproductivity_id_seq;
       public       marabout    false            *           1259    83384    operatorproductivitys    TABLE     ~  CREATE TABLE public.operatorproductivitys (
    accordproductivity double precision,
    excesscost double precision,
    globalproductivity double precision,
    cumulwage double precision,
    period text,
    date timestamp(0) without time zone,
    user_id integer,
    created_at timestamp(0) without time zone,
    active text,
    operatorproductivity_id integer NOT NULL
);
 )   DROP TABLE public.operatorproductivitys;
       public         marabout    false            T           1259    83931 1   operatorproductivitys_operatorproductivity_id_seq    SEQUENCE     �   CREATE SEQUENCE public.operatorproductivitys_operatorproductivity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 H   DROP SEQUENCE public.operatorproductivitys_operatorproductivity_id_seq;
       public       marabout    false    298            f           0    0 1   operatorproductivitys_operatorproductivity_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.operatorproductivitys_operatorproductivity_id_seq OWNED BY public.operatorproductivitys.operatorproductivity_id;
            public       marabout    false    340            ,           1259    83404    orders    TABLE     ]  CREATE TABLE public.orders (
    article_id integer,
    label character varying(45) DEFAULT NULL::character varying,
    code character varying(45) DEFAULT NULL::character varying,
    description character varying(128) DEFAULT NULL::character varying,
    quantity integer,
    order_id integer NOT NULL,
    active text,
    client_id integer
);
    DROP TABLE public.orders;
       public         marabout    false            +           1259    83391    ordre_id_seq    SEQUENCE     u   CREATE SEQUENCE public.ordre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.ordre_id_seq;
       public       marabout    false            .           1259    83413    ordre_ordre_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ordre_ordre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.ordre_ordre_id_seq;
       public       marabout    false    300            g           0    0    ordre_ordre_id_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.ordre_ordre_id_seq OWNED BY public.orders.order_id;
            public       marabout    false    302            �            1259    74848    permissions    TABLE     t   CREATE TABLE public.permissions (
    permission_id integer NOT NULL,
    permission_label text,
    active text
);
    DROP TABLE public.permissions;
       public         marabout    false            �            1259    74846    permissions_permission_id_seq    SEQUENCE     �   CREATE SEQUENCE public.permissions_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.permissions_permission_id_seq;
       public       marabout    false    241            h           0    0    permissions_permission_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.permissions_permission_id_seq OWNED BY public.permissions.permission_id;
            public       marabout    false    240                        1259    82845    printers    TABLE     G  CREATE TABLE public.printers (
    printer_id integer NOT NULL,
    printer_label text,
    printer_ip text,
    printer_description text,
    printer_status boolean,
    printer_deployed boolean,
    printer_uptime integer,
    printer_configuration_file_id integer,
    printer_tag text,
    active text,
    port integer
);
    DROP TABLE public.printers;
       public         marabout    false            �            1259    82843    printers_printer_id_seq    SEQUENCE     �   CREATE SEQUENCE public.printers_printer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.printers_printer_id_seq;
       public       marabout    false    256            i           0    0    printers_printer_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.printers_printer_id_seq OWNED BY public.printers.printer_id;
            public       marabout    false    255            �           1259    140767 
   priorities    TABLE     f   CREATE TABLE public.priorities (
    label text,
    active text,
    id_priority integer NOT NULL
);
    DROP TABLE public.priorities;
       public         marabout    false            �           1259    166152    priorities_id_priority_seq    SEQUENCE     �   CREATE SEQUENCE public.priorities_id_priority_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.priorities_id_priority_seq;
       public       marabout    false    391            j           0    0    priorities_id_priority_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.priorities_id_priority_seq OWNED BY public.priorities.id_priority;
            public       marabout    false    407            �            1259    74607    profiles    TABLE     �   CREATE TABLE public.profiles (
    profile_id integer NOT NULL,
    profile_label text,
    profile_allowedsections text,
    profile_description text,
    active text,
    has_update text,
    has_delete text,
    has_save text
);
    DROP TABLE public.profiles;
       public         marabout    false            �            1259    74605    profiles_profile_id_seq    SEQUENCE     �   CREATE SEQUENCE public.profiles_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.profiles_profile_id_seq;
       public       marabout    false    232            k           0    0    profiles_profile_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.profiles_profile_id_seq OWNED BY public.profiles.profile_id;
            public       marabout    false    231            -           1259    83411    report_id_seq    SEQUENCE     v   CREATE SEQUENCE public.report_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.report_id_seq;
       public       marabout    false            /           1259    83422    reports    TABLE        CREATE TABLE public.reports (
    user_id integer,
    operation_id integer,
    box_id integer,
    bundle_id integer,
    cart_id integer,
    status integer,
    finished integer,
    stitch_count integer,
    thread_cuts integer,
    "time" character varying(255) DEFAULT NULL::character varying,
    quantity integer,
    datestart character varying(255) DEFAULT NULL::character varying,
    dateend character varying(255) DEFAULT NULL::character varying,
    report_id integer NOT NULL,
    active text
);
    DROP TABLE public.reports;
       public         marabout    false            0           1259    83432    report_report_id_seq    SEQUENCE     �   CREATE SEQUENCE public.report_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.report_report_id_seq;
       public       marabout    false    303            l           0    0    report_report_id_seq    SEQUENCE OWNED BY     N   ALTER SEQUENCE public.report_report_id_seq OWNED BY public.reports.report_id;
            public       marabout    false    304            R           1259    83920    revision_events_id_revision_seq    SEQUENCE     �   CREATE SEQUENCE public.revision_events_id_revision_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.revision_events_id_revision_seq;
       public       marabout    false    339            m           0    0    revision_events_id_revision_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.revision_events_id_revision_seq OWNED BY public.revision_events.id_revision;
            public       marabout    false    338            �            1259    75184     revision_machine_revision_id_seq    SEQUENCE     �   CREATE SEQUENCE public.revision_machine_revision_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.revision_machine_revision_id_seq;
       public       marabout    false    248            n           0    0     revision_machine_revision_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.revision_machine_revision_id_seq OWNED BY public.revision_machine.revision_id;
            public       marabout    false    247            1           1259    83443    romboldtxts    TABLE     �  CREATE TABLE public.romboldtxts (
    header_ref character varying(100) DEFAULT NULL::character varying,
    package_id character varying(100) DEFAULT NULL::character varying,
    package_bc character varying(100) DEFAULT NULL::character varying,
    model character varying(100) DEFAULT NULL::character varying,
    variant1 integer,
    variant2 character varying(50) DEFAULT NULL::character varying,
    variant3 character varying(255) DEFAULT NULL::character varying,
    size1 character varying(45) DEFAULT NULL::character varying,
    size2 character varying(45) DEFAULT NULL::character varying,
    quantity integer,
    customer_id character varying(45) DEFAULT NULL::character varying,
    cuo_id character varying(45) DEFAULT NULL::character varying,
    cuo_pos character varying(45) DEFAULT NULL::character varying,
    expr1 character varying(45) DEFAULT NULL::character varying,
    zu_tc_man3 character varying(45) DEFAULT NULL::character varying,
    zu_tc_man2 character varying(45) DEFAULT NULL::character varying,
    zu_tc_man4 character varying(45) DEFAULT NULL::character varying,
    zu_tc_man5 character varying(45) DEFAULT NULL::character varying,
    zu_tc_man6 character varying(45) DEFAULT NULL::character varying,
    bd_refid character varying(45) DEFAULT NULL::character varying,
    card_pcs integer,
    created_at character varying(255) DEFAULT NULL::character varying,
    romboldtxt_id integer NOT NULL,
    order_id integer,
    active text
);
    DROP TABLE public.romboldtxts;
       public         marabout    false            3           1259    83474    romboldtxt_romboldtxt_id_seq    SEQUENCE     �   CREATE SEQUENCE public.romboldtxt_romboldtxt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.romboldtxt_romboldtxt_id_seq;
       public       marabout    false    305            o           0    0    romboldtxt_romboldtxt_id_seq    SEQUENCE OWNED BY     ^   ALTER SEQUENCE public.romboldtxt_romboldtxt_id_seq OWNED BY public.romboldtxts.romboldtxt_id;
            public       marabout    false    307            {           1259    140569    sequence_operations    TABLE       CREATE TABLE public.sequence_operations (
    stitchcount integer,
    coupe_fil integer,
    parent_sequence integer,
    back_stitch integer,
    sequence_order integer,
    picture_id integer,
    active text,
    operation_template_id integer,
    back_stich_positive_tolerence integer,
    back_stich_negative_tolerence integer,
    stitchcount_positive_tolerence integer,
    stitchcount_negative_tolerence integer,
    sequence_id integer,
    operation_id integer,
    sequence_operation_id integer NOT NULL,
    description text
);
 '   DROP TABLE public.sequence_operations;
       public         marabout    false            |           1259    140608 -   sequence_operations_sequence_operation_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sequence_operations_sequence_operation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 D   DROP SEQUENCE public.sequence_operations_sequence_operation_id_seq;
       public       marabout    false    379            p           0    0 -   sequence_operations_sequence_operation_id_seq    SEQUENCE OWNED BY        ALTER SEQUENCE public.sequence_operations_sequence_operation_id_seq OWNED BY public.sequence_operations.sequence_operation_id;
            public       marabout    false    380            q           1259    140240 	   sequences    TABLE     �  CREATE TABLE public.sequences (
    sequence_id integer NOT NULL,
    stitchcount integer,
    sequence_order integer,
    picture_id integer,
    active text,
    coupe_fil integer,
    back_stitch integer,
    operation_template_id integer,
    parent_sequence integer,
    back_stich_positive_tolerence integer,
    back_stich_negative_tolerence integer,
    stitchcount_positive_tolerence integer,
    stitchcount_negative_tolerence integer,
    with_subsequences text,
    description text
);
    DROP TABLE public.sequences;
       public         marabout    false            p           1259    140238    sequences_sequence_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sequences_sequence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.sequences_sequence_id_seq;
       public       marabout    false    369            q           0    0    sequences_sequence_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.sequences_sequence_id_seq OWNED BY public.sequences.sequence_id;
            public       marabout    false    368            �            1259    33430    servers    TABLE     �   CREATE TABLE public.servers (
    server_id integer NOT NULL,
    server_label text,
    server_ip text,
    server_description text,
    server_status boolean,
    server_deployed boolean,
    server_uptime integer,
    active text
);
    DROP TABLE public.servers;
       public         marabout    false            �            1259    33428    servers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.servers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.servers_id_seq;
       public       marabout    false    213            r           0    0    servers_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.servers_id_seq OWNED BY public.servers.server_id;
            public       marabout    false    212            �            1259    24703    sites    TABLE     :  CREATE TABLE public.sites (
    site_id integer NOT NULL,
    site_label text,
    site_email text,
    site_phone numeric,
    site_technicalcontact text,
    site_prodcontact text,
    site_fax numeric,
    site_address text,
    site_city text,
    country_id integer,
    client_id integer,
    active text
);
    DROP TABLE public.sites;
       public         marabout    false            �            1259    24701    sites_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.sites_id_seq;
       public       marabout    false    199            s           0    0    sites_id_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.sites_id_seq OWNED BY public.sites.site_id;
            public       marabout    false    198            \           1259    91047    skill_employees    TABLE     �   CREATE TABLE public.skill_employees (
    skill_employee_id integer NOT NULL,
    skill_id integer,
    active text,
    emp_id integer
);
 #   DROP TABLE public.skill_employees;
       public         marabout    false            [           1259    91045 %   skill_employees_skill_employee_id_seq    SEQUENCE     �   CREATE SEQUENCE public.skill_employees_skill_employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 <   DROP SEQUENCE public.skill_employees_skill_employee_id_seq;
       public       marabout    false    348            t           0    0 %   skill_employees_skill_employee_id_seq    SEQUENCE OWNED BY     o   ALTER SEQUENCE public.skill_employees_skill_employee_id_seq OWNED BY public.skill_employees.skill_employee_id;
            public       marabout    false    347            Z           1259    91029    skills    TABLE     �   CREATE TABLE public.skills (
    skill_id integer NOT NULL,
    skill_label text,
    skill_description text,
    active text
);
    DROP TABLE public.skills;
       public         marabout    false            Y           1259    91027    skills_skill_id_seq    SEQUENCE     �   CREATE SEQUENCE public.skills_skill_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.skills_skill_id_seq;
       public       marabout    false    346            u           0    0    skills_skill_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.skills_skill_id_seq OWNED BY public.skills.skill_id;
            public       marabout    false    345            2           1259    83471    stat_day_id_seq    SEQUENCE     x   CREATE SEQUENCE public.stat_day_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.stat_day_id_seq;
       public       marabout    false            4           1259    83485 	   stat_days    TABLE     {  CREATE TABLE public.stat_days (
    date_to character varying(255),
    nbr_user_online integer,
    total_box integer,
    nb_box_break_cat1 text,
    nb_box_break_cat2 text,
    work_time integer,
    nbr_user_absent integer,
    nb_bundle_group text,
    total_time_bundle integer,
    total_bundle character varying(255),
    stat_day_id integer NOT NULL,
    active text
);
    DROP TABLE public.stat_days;
       public         marabout    false            U           1259    83984    stat_days_stat_day_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stat_days_stat_day_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.stat_days_stat_day_id_seq;
       public       marabout    false    308            v           0    0    stat_days_stat_day_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.stat_days_stat_day_id_seq OWNED BY public.stat_days.stat_day_id;
            public       marabout    false    341            5           1259    83492    stat_hour_id_seq    SEQUENCE     y   CREATE SEQUENCE public.stat_hour_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.stat_hour_id_seq;
       public       marabout    false            6           1259    83505 
   stat_hours    TABLE     �  CREATE TABLE public.stat_hours (
    date_to character varying(255),
    nbr_user_online integer,
    total_box integer,
    nb_box_break_cat1 text,
    nb_box_break_cat2 text,
    work_time integer,
    nbr_user_absent integer,
    nb_bundle_group text,
    total_time_bundle integer,
    total_bundle character varying(255),
    nbr_box_online integer,
    stat_hour_id integer NOT NULL,
    active text
);
    DROP TABLE public.stat_hours;
       public         marabout    false            8           1259    83514    stat_hour_stat_hour_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stat_hour_stat_hour_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.stat_hour_stat_hour_id_seq;
       public       marabout    false    310            w           0    0    stat_hour_stat_hour_id_seq    SEQUENCE OWNED BY     Z   ALTER SEQUENCE public.stat_hour_stat_hour_id_seq OWNED BY public.stat_hours.stat_hour_id;
            public       marabout    false    312            7           1259    83512    stat_inst_id_seq    SEQUENCE     y   CREATE SEQUENCE public.stat_inst_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.stat_inst_id_seq;
       public       marabout    false            9           1259    83525 
   stat_insts    TABLE     �  CREATE TABLE public.stat_insts (
    date_to character varying(255),
    nbr_user_online integer,
    total_box integer,
    nb_box_break_cat1 text,
    nb_box_break_cat2 text,
    work_time integer,
    nbr_user_absent integer,
    nb_bundle_group text,
    total_time_bundle integer,
    total_bundle integer,
    nbr_box_online integer,
    stat_inst_id integer NOT NULL,
    active text
);
    DROP TABLE public.stat_insts;
       public         marabout    false            V           1259    83995    stat_insts_stat_inst_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stat_insts_stat_inst_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.stat_insts_stat_inst_id_seq;
       public       marabout    false    313            x           0    0    stat_insts_stat_inst_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.stat_insts_stat_inst_id_seq OWNED BY public.stat_insts.stat_inst_id;
            public       marabout    false    342            :           1259    83532    stat_month_id_seq    SEQUENCE     z   CREATE SEQUENCE public.stat_month_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.stat_month_id_seq;
       public       marabout    false            ;           1259    83545    stat_months    TABLE     �  CREATE TABLE public.stat_months (
    date_to character varying(255),
    nbr_user_online integer,
    total_box integer,
    nb_box_break_cat1 text,
    nb_box_break_cat2 text,
    work_time integer,
    nbr_user_absent integer,
    nb_bundle_group text,
    total_time_bundle integer,
    total_bundle character varying(255),
    nbr_box_online integer,
    stat_month_id integer NOT NULL,
    active text
);
    DROP TABLE public.stat_months;
       public         marabout    false            =           1259    83554    stat_month_stat_month_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stat_month_stat_month_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.stat_month_stat_month_id_seq;
       public       marabout    false    315            y           0    0    stat_month_stat_month_id_seq    SEQUENCE OWNED BY     ^   ALTER SEQUENCE public.stat_month_stat_month_id_seq OWNED BY public.stat_months.stat_month_id;
            public       marabout    false    317            <           1259    83552    stat_week_id_seq    SEQUENCE     y   CREATE SEQUENCE public.stat_week_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.stat_week_id_seq;
       public       marabout    false            >           1259    83566 
   stat_weeks    TABLE     �  CREATE TABLE public.stat_weeks (
    date_to character varying(255),
    nbr_user_online integer,
    total_box integer,
    nb_box_break_cat1 text,
    nb_box_break_cat2 text,
    work_time integer,
    nbr_user_absent integer,
    nb_bundle_group text,
    total_time_bundle integer,
    total_bundle character varying(255),
    nbr_box_online integer,
    stat_week_id integer NOT NULL,
    active text
);
    DROP TABLE public.stat_weeks;
       public         marabout    false            @           1259    83575    stat_week_stat_week_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stat_week_stat_week_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.stat_week_stat_week_id_seq;
       public       marabout    false    318            z           0    0    stat_week_stat_week_id_seq    SEQUENCE OWNED BY     Z   ALTER SEQUENCE public.stat_week_stat_week_id_seq OWNED BY public.stat_weeks.stat_week_id;
            public       marabout    false    320            ?           1259    83573    stat_year_id_seq    SEQUENCE     y   CREATE SEQUENCE public.stat_year_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.stat_year_id_seq;
       public       marabout    false            A           1259    83586 
   stat_years    TABLE     �  CREATE TABLE public.stat_years (
    date_to character varying(255),
    nbr_user_online integer,
    total_box integer,
    nb_box_break_cat1 text,
    nb_box_break_cat2 text,
    work_time integer,
    nbr_user_absent integer,
    nb_bundle_group text,
    total_time_bundle integer,
    total_bundle character varying(255),
    nbr_box_online integer,
    stat_year_id integer NOT NULL,
    active text
);
    DROP TABLE public.stat_years;
       public         marabout    false            C           1259    83606    stat_year_stat_year_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stat_year_stat_year_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.stat_year_stat_year_id_seq;
       public       marabout    false    321            {           0    0    stat_year_stat_year_id_seq    SEQUENCE OWNED BY     Z   ALTER SEQUENCE public.stat_year_stat_year_id_seq OWNED BY public.stat_years.stat_year_id;
            public       marabout    false    323            �            1259    74683    status_employees    TABLE     w   CREATE TABLE public.status_employees (
    empstatus_id integer NOT NULL,
    empstatus_label text,
    active text
);
 $   DROP TABLE public.status_employees;
       public         marabout    false            �            1259    74681 !   status_employees_empstatus_id_seq    SEQUENCE     �   CREATE SEQUENCE public.status_employees_empstatus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.status_employees_empstatus_id_seq;
       public       marabout    false    234            |           0    0 !   status_employees_empstatus_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.status_employees_empstatus_id_seq OWNED BY public.status_employees.empstatus_id;
            public       marabout    false    233            r           1259    140258    status_machine_lights    TABLE     �   CREATE TABLE public.status_machine_lights (
    label text,
    code text,
    metas text,
    status_machine_light_id integer NOT NULL
);
 )   DROP TABLE public.status_machine_lights;
       public         marabout    false            w           1259    140341 1   status_machine_lights_status_machine_light_id_seq    SEQUENCE     �   CREATE SEQUENCE public.status_machine_lights_status_machine_light_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 H   DROP SEQUENCE public.status_machine_lights_status_machine_light_id_seq;
       public       marabout    false    370            }           0    0 1   status_machine_lights_status_machine_light_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public.status_machine_lights_status_machine_light_id_seq OWNED BY public.status_machine_lights.status_machine_light_id;
            public       marabout    false    375            �            1259    74721    status_machines    TABLE     �   CREATE TABLE public.status_machines (
    sm_id integer NOT NULL,
    sm_label text,
    sm_description text,
    active text
);
 #   DROP TABLE public.status_machines;
       public         marabout    false            �            1259    74719    status_machines_sm_id_seq    SEQUENCE     �   CREATE SEQUENCE public.status_machines_sm_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.status_machines_sm_id_seq;
       public       marabout    false    236            ~           0    0    status_machines_sm_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.status_machines_sm_id_seq OWNED BY public.status_machines.sm_id;
            public       marabout    false    235            �           1259    140642    status_maintenances    TABLE     �   CREATE TABLE public.status_maintenances (
    label text,
    code text,
    active text,
    status_maintenance_id integer NOT NULL
);
 '   DROP TABLE public.status_maintenances;
       public         marabout    false            �           1259    164851 -   status_maintenances_status_maintenance_id_seq    SEQUENCE     �   CREATE SEQUENCE public.status_maintenances_status_maintenance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 D   DROP SEQUENCE public.status_maintenances_status_maintenance_id_seq;
       public       marabout    false    384                       0    0 -   status_maintenances_status_maintenance_id_seq    SEQUENCE OWNED BY        ALTER SEQUENCE public.status_maintenances_status_maintenance_id_seq OWNED BY public.status_maintenances.status_maintenance_id;
            public       marabout    false    406            m           1259    140183    status_tickets    TABLE     p   CREATE TABLE public.status_tickets (
    label text,
    code text,
    active text,
    id integer NOT NULL
);
 "   DROP TABLE public.status_tickets;
       public         marabout    false            �           1259    164786    status_tickets_id_seq    SEQUENCE     �   CREATE SEQUENCE public.status_tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.status_tickets_id_seq;
       public       marabout    false    365            �           0    0    status_tickets_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.status_tickets_id_seq OWNED BY public.status_tickets.id;
            public       marabout    false    402            �            1259    66844    status_users    TABLE     d   CREATE TABLE public.status_users (
    user_statuslabel text,
    user_statusid integer NOT NULL
);
     DROP TABLE public.status_users;
       public         marabout    false            �            1259    74882    status_users_user_statusid_seq    SEQUENCE     �   CREATE SEQUENCE public.status_users_user_statusid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.status_users_user_statusid_seq;
       public       marabout    false    228            �           0    0    status_users_user_statusid_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.status_users_user_statusid_seq OWNED BY public.status_users.user_statusid;
            public       marabout    false    244            �           1259    140698    stitchcount    VIEW     �   CREATE VIEW public.stitchcount AS
 SELECT mso.machine_id,
    sum(mso.stitchcount) AS total_stitchcount
   FROM public.machine_session_operations mso
  GROUP BY mso.machine_id;
    DROP VIEW public.stitchcount;
       public       marabout    false    360    360            �            1259    32882    tasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public       marabout    false    207            �           0    0    tasks_id_seq    SEQUENCE OWNED BY     @   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.jobs.job_id;
            public       marabout    false    206            �            1259    66303    terminal_types    TABLE     �   CREATE TABLE public.terminal_types (
    "Tt_label" text,
    "Tt_description" text,
    "Tt_id" integer NOT NULL,
    active text
);
 "   DROP TABLE public.terminal_types;
       public         marabout    false            �            1259    74865    terminal_types_Tt_id_seq    SEQUENCE     �   CREATE SEQUENCE public."terminal_types_Tt_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."terminal_types_Tt_id_seq";
       public       marabout    false    226            �           0    0    terminal_types_Tt_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public."terminal_types_Tt_id_seq" OWNED BY public.terminal_types."Tt_id";
            public       marabout    false    243            �            1259    66295 	   terminals    TABLE     Q  CREATE TABLE public.terminals (
    "Terminal_label" text,
    "Terminal_ip" text,
    "Terminal_description" text,
    "Terminal_id" integer NOT NULL,
    "Tt_id" integer,
    "Terminal_deployment_date" date,
    "Terminal_status" boolean,
    "Terminal_uptime" integer,
    "Terminal_configuration_file_id" integer,
    active text
);
    DROP TABLE public.terminals;
       public         marabout    false            �            1259    74854    terminals_Terminal_id_seq    SEQUENCE     �   CREATE SEQUENCE public."terminals_Terminal_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."terminals_Terminal_id_seq";
       public       marabout    false    225            �           0    0    terminals_Terminal_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."terminals_Terminal_id_seq" OWNED BY public.terminals."Terminal_id";
            public       marabout    false    242            o           1259    140211    ticket_feed_attachments    TABLE     �   CREATE TABLE public.ticket_feed_attachments (
    file_id integer,
    created_at timestamp without time zone,
    active text,
    id integer NOT NULL,
    ticket_feed_id integer
);
 +   DROP TABLE public.ticket_feed_attachments;
       public         marabout    false            �           1259    164718    ticket_feed_attachments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ticket_feed_attachments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.ticket_feed_attachments_id_seq;
       public       marabout    false    367            �           0    0    ticket_feed_attachments_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.ticket_feed_attachments_id_seq OWNED BY public.ticket_feed_attachments.id;
            public       marabout    false    398            n           1259    140194    ticket_feeds    TABLE     &  CREATE TABLE public.ticket_feeds (
    comment text,
    created_at timestamp without time zone,
    active text,
    department_id integer,
    owner_id integer,
    created_by integer,
    image_id integer,
    ticket_feed_id integer NOT NULL,
    ticket_id integer,
    status_id integer
);
     DROP TABLE public.ticket_feeds;
       public         marabout    false            �           1259    164729    ticket_feeds_ticket_feed_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ticket_feeds_ticket_feed_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public.ticket_feeds_ticket_feed_id_seq;
       public       marabout    false    366            �           0    0    ticket_feeds_ticket_feed_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE public.ticket_feeds_ticket_feed_id_seq OWNED BY public.ticket_feeds.ticket_feed_id;
            public       marabout    false    399            l           1259    140157    ticket_structures    TABLE     �  CREATE TABLE public.ticket_structures (
    subject text,
    line_id integer,
    department_id integer,
    created_at timestamp without time zone,
    owner_id integer,
    active text,
    operation_id integer,
    created_by integer,
    bundle_id integer,
    order_id integer,
    box_id integer,
    source text,
    image_id integer,
    id integer NOT NULL,
    observation_id integer,
    current_status_id integer,
    id_priority integer
);
 %   DROP TABLE public.ticket_structures;
       public         marabout    false            �           1259    164745    ticket_structures_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ticket_structures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.ticket_structures_id_seq;
       public       marabout    false    364            �           0    0    ticket_structures_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.ticket_structures_id_seq OWNED BY public.ticket_structures.id;
            public       marabout    false    400            �            1259    24808    tickets    TABLE     �   CREATE TABLE public.tickets (
    id integer NOT NULL,
    subject text,
    description text,
    priority text,
    status text,
    user_id numeric,
    active text
);
    DROP TABLE public.tickets;
       public         marabout    false            �            1259    24806    tickets_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.tickets_id_seq;
       public       marabout    false    203            �           0    0    tickets_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;
            public       marabout    false    202            B           1259    83593    token_api_listener_id_seq    SEQUENCE     �   CREATE SEQUENCE public.token_api_listener_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.token_api_listener_id_seq;
       public       marabout    false            D           1259    83617    token_api_listeners    TABLE       CREATE TABLE public.token_api_listeners (
    token character varying(255),
    response text,
    requestdata character varying(255),
    date_created timestamp(0) without time zone,
    retries integer,
    token_api_listener_id integer NOT NULL,
    active text
);
 '   DROP TABLE public.token_api_listeners;
       public         marabout    false            F           1259    83626 ,   token_api_listener_token_api_listener_id_seq    SEQUENCE     �   CREATE SEQUENCE public.token_api_listener_token_api_listener_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 C   DROP SEQUENCE public.token_api_listener_token_api_listener_id_seq;
       public       marabout    false    324            �           0    0 ,   token_api_listener_token_api_listener_id_seq    SEQUENCE OWNED BY     ~   ALTER SEQUENCE public.token_api_listener_token_api_listener_id_seq OWNED BY public.token_api_listeners.token_api_listener_id;
            public       marabout    false    326            �           1259    140763    totalfailurecount    VIEW     �   CREATE VIEW public.totalfailurecount AS
 SELECT revision_events.machine_id,
    count(revision_events.event_id) AS totalfailurecount
   FROM public.revision_events
  WHERE (revision_events.event_id = 4)
  GROUP BY revision_events.machine_id;
 $   DROP VIEW public.totalfailurecount;
       public       marabout    false    339    339            �           1259    140749    totalworkinghours    VIEW       CREATE VIEW public.totalworkinghours AS
 SELECT machine_sessions.machine_id,
    sum(date_part('hour'::text, age(machine_sessions.time_out, machine_sessions.time_in))) AS totalworkinghours
   FROM public.machine_sessions
  GROUP BY machine_sessions.machine_id;
 $   DROP VIEW public.totalworkinghours;
       public       marabout    false    358    358    358            �            1259    74581    users    TABLE     �  CREATE TABLE public.users (
    user_name text,
    user_passwordhash text,
    user_familyname text,
    user_email text,
    user_address text,
    user_city text,
    user_status boolean,
    group_id integer,
    profile_id integer,
    reset_password_token text,
    active_account_token text,
    client_id integer,
    user_id integer NOT NULL,
    active text,
    rfid character varying,
    name text,
    user_phonenumber text
);
    DROP TABLE public.users;
       public         marabout    false            �            1259    74588    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public       marabout    false    229            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
            public       marabout    false    230            E           1259    83624    usersession_id_seq    SEQUENCE     {   CREATE SEQUENCE public.usersession_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.usersession_id_seq;
       public       marabout    false            G           1259    83637    usersessions    TABLE     �  CREATE TABLE public.usersessions (
    box_id integer,
    last_tag character varying(45) DEFAULT NULL::character varying,
    time_in timestamp(0) without time zone,
    time_out timestamp(0) without time zone DEFAULT NULL::timestamp without time zone,
    cart_id integer,
    logout_tag character varying(45) DEFAULT NULL::character varying,
    op_offset integer,
    usersession_id integer NOT NULL,
    active text,
    usersession_export integer,
    employee_id integer
);
     DROP TABLE public.usersessions;
       public         marabout    false            I           1259    83646    usersession_usersession_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usersession_usersession_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.usersession_usersession_id_seq;
       public       marabout    false    327            �           0    0    usersession_usersession_id_seq    SEQUENCE OWNED BY     b   ALTER SEQUENCE public.usersession_usersession_id_seq OWNED BY public.usersessions.usersession_id;
            public       marabout    false    329            �           1259    174329    views_cps_data    VIEW     K  CREATE VIEW public.views_cps_data AS
 SELECT cps.cart_pending_session_id,
    cps.cart_pendingoperation_id,
    cps.session_id,
    us.employee_id,
    to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text) AS date_operation,
    concat(to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text), to_char(((us.time_in)::time without time zone)::interval, 'HH24'::text)) AS date_hour_operation,
    cps.quantity,
    cps.start_time,
    cps.end_time,
    (((date_part('epoch'::text, cps.end_time) - date_part('epoch'::text, cps.start_time)))::real)::integer AS time_passed,
    op.quantity AS total_quantity_needed,
    (op."time" * (60)::double precision) AS time_needed_by_item,
    ((op."time" * (60)::double precision) * (cps.quantity)::double precision) AS total_time_needed,
        CASE
            WHEN (cps.end_time < cps.start_time) THEN (0)::double precision
            ELSE ((((op."time" * (60)::double precision) * (cps.quantity)::double precision) / ((((date_part('epoch'::text, cps.end_time) - date_part('epoch'::text, cps.start_time)))::real)::integer)::double precision) * (100)::double precision)
        END AS efficiency,
    bx.box_id,
    bx.line_id
   FROM ((((public.cart_pending_sessions cps
     LEFT JOIN public.cart_pending_operations cpo ON (((cpo.cart_pending_operation_id = cps.cart_pendingoperation_id) AND (cpo.active = 'Y'::text))))
     LEFT JOIN public.operations op ON (((op.operation_id = cpo.operation_id) AND (op.active = 'Y'::text))))
     LEFT JOIN public.usersessions us ON ((us.usersession_id = cps.session_id)))
     LEFT JOIN public.boxes bx ON ((bx.box_id = us.box_id)))
  WHERE ((cps.start_time IS NOT NULL) AND (cps.end_time IS NOT NULL) AND (cps.active = 'Y'::text) AND (cps.quantity > 0))
  ORDER BY (to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)) DESC;
 !   DROP VIEW public.views_cps_data;
       public       marabout    false    222    284    279    284    279    279    284    284    284    284    284    294    294    294    294    327    327    327    327    222            �           1259    174334 !   views_cps_data_by_employee_by_day    VIEW     �  CREATE VIEW public.views_cps_data_by_employee_by_day AS
 SELECT vcpsd.employee_id,
    vcpsd.date_operation,
    sum(vcpsd.quantity) AS total_quantity,
    sum(vcpsd.time_passed) AS total_time_passed,
    sum(vcpsd.total_time_needed) AS total_time_needed,
    (sum(vcpsd.efficiency) / (count(vcpsd.*))::double precision) AS total_efficiency
   FROM public.views_cps_data vcpsd
  GROUP BY vcpsd.employee_id, vcpsd.date_operation;
 4   DROP VIEW public.views_cps_data_by_employee_by_day;
       public       marabout    false    416    416    416    416    416    416            �           1259    174338 )   views_cps_data_by_employee_by_day_by_line    VIEW     �  CREATE VIEW public.views_cps_data_by_employee_by_day_by_line AS
 SELECT vcpsd.employee_id,
    vcpsd.date_operation,
    sum(vcpsd.quantity) AS total_quantity,
    sum(vcpsd.time_passed) AS total_time_passed,
    sum(vcpsd.total_time_needed) AS total_time_needed,
    (sum(vcpsd.efficiency) / (count(vcpsd.*))::double precision) AS total_efficiency
   FROM public.views_cps_data vcpsd
  GROUP BY vcpsd.employee_id, vcpsd.date_operation, vcpsd.line_id;
 <   DROP VIEW public.views_cps_data_by_employee_by_day_by_line;
       public       marabout    false    416    416    416    416    416    416    416            ~           1259    140629    views_efficiency    VIEW     {   CREATE VIEW public.views_efficiency AS
SELECT
    NULL::integer AS operation_id,
    NULL::double precision AS efficiency;
 #   DROP VIEW public.views_efficiency;
       public       marabout    false            �           1259    140855    views_efficiency_by_day    VIEW     �   CREATE VIEW public.views_efficiency_by_day AS
SELECT
    NULL::integer AS operation_id,
    NULL::double precision AS efficiency,
    NULL::text AS date_operation;
 *   DROP VIEW public.views_efficiency_by_day;
       public       marabout    false            �           1259    140875     views_efficiency_opeartor_by_day    VIEW     �   CREATE VIEW public.views_efficiency_opeartor_by_day AS
SELECT
    NULL::integer AS employee_id,
    NULL::integer AS operation_id,
    NULL::double precision AS efficiency,
    NULL::text AS date_operation;
 3   DROP VIEW public.views_efficiency_opeartor_by_day;
       public       marabout    false            �           1259    174342    views_employee_breaks_by_day    VIEW       CREATE VIEW public.views_employee_breaks_by_day AS
 SELECT to_char(((b.start_time)::date)::timestamp with time zone, 'yyyymmdd'::text) AS day_break,
    us.employee_id,
    sum((date_part('epoch'::text, b.end_time) - date_part('epoch'::text, b.start_time))) AS total_time_break,
    min(b.start_time) AS time_first_break,
    max(b.end_time) AS time_last_break,
    count(b.*) AS total_breaks
   FROM ((public.breaks b
     LEFT JOIN public.usersessions us ON ((us.usersession_id = b.usersession_id)))
     LEFT JOIN public.boxes bx ON ((bx.box_id = us.box_id)))
  WHERE ((b.active = 'Y'::text) AND (b.start_time IS NOT NULL) AND (b.end_time IS NOT NULL) AND (us.active = 'Y'::text))
  GROUP BY (to_char(((b.start_time)::date)::timestamp with time zone, 'yyyymmdd'::text)), us.employee_id;
 /   DROP VIEW public.views_employee_breaks_by_day;
       public       marabout    false    267    327    327    327    327    267    267    267    222            �           1259    174347 $   views_employee_breaks_by_day_by_line    VIEW       CREATE VIEW public.views_employee_breaks_by_day_by_line AS
 SELECT to_char(((b.start_time)::date)::timestamp with time zone, 'yyyymmdd'::text) AS day_break,
    us.employee_id,
    sum((date_part('epoch'::text, b.end_time) - date_part('epoch'::text, b.start_time))) AS total_time_break,
    min(b.start_time) AS time_first_break,
    max(b.end_time) AS time_last_break,
    count(b.*) AS total_breaks,
    bx.line_id
   FROM ((public.breaks b
     LEFT JOIN public.usersessions us ON ((us.usersession_id = b.usersession_id)))
     LEFT JOIN public.boxes bx ON ((bx.box_id = us.box_id)))
  WHERE ((b.active = 'Y'::text) AND (b.start_time IS NOT NULL) AND (b.end_time IS NOT NULL))
  GROUP BY (to_char(((b.start_time)::date)::timestamp with time zone, 'yyyymmdd'::text)), us.employee_id, bx.line_id;
 7   DROP VIEW public.views_employee_breaks_by_day_by_line;
       public       marabout    false    267    267    267    327    222    327    327    267    222            �           1259    174352    views_user_in_break_by_day    VIEW     /  CREATE VIEW public.views_user_in_break_by_day AS
 SELECT to_char(((b.start_time)::date)::timestamp with time zone, 'yyyymmdd'::text) AS day_break,
    us.employee_id
   FROM ((public.breaks b
     LEFT JOIN public.usersessions us ON ((us.usersession_id = b.usersession_id)))
     LEFT JOIN public.boxes bx ON ((bx.box_id = us.box_id)))
  WHERE ((b.active = 'Y'::text) AND (b.start_time IS NOT NULL) AND (b.end_time IS NULL) AND (us.active = 'Y'::text))
  GROUP BY (to_char(((b.start_time)::date)::timestamp with time zone, 'yyyymmdd'::text)), us.employee_id;
 -   DROP VIEW public.views_user_in_break_by_day;
       public       marabout    false    267    267    267    267    222    327    327    327    327            �           1259    174362    views_user_online_by_day    VIEW     [  CREATE VIEW public.views_user_online_by_day AS
 SELECT us.employee_id,
    to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text) AS day_session
   FROM public.usersessions us
  WHERE ((us.employee_id IS NOT NULL) AND (us.time_in IS NOT NULL) AND (us.active = 'Y'::text) AND ((us.time_in <= us.time_out) OR ((us.time_in IS NOT NULL) AND (us.time_out IS NULL))) AND (us.time_out IS NULL))
  GROUP BY us.employee_id, (to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text))
  ORDER BY (to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)) DESC;
 +   DROP VIEW public.views_user_online_by_day;
       public       marabout    false    327    327    327    327            �           1259    174371 !   views_user_sessions_status_by_day    VIEW     X	  CREATE VIEW public.views_user_sessions_status_by_day AS
 SELECT us.employee_id,
    to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text) AS day_session,
        CASE
            WHEN (count(vuibd.employee_id) <> 0) THEN 'in_break'::text
            WHEN (vuod.employee_id IS NULL) THEN 'offline'::text
            ELSE 'online'::text
        END AS session_status,
    min(us.time_in) AS time_first_login,
        CASE
            WHEN (max(COALESCE(us.time_out, ((now())::date)::timestamp without time zone)) = (now())::date) THEN NULL::timestamp without time zone
            ELSE max(us.time_out)
        END AS time_last_logout,
        CASE
            WHEN (max(COALESCE(us.time_out, ((now())::date)::timestamp without time zone)) = (now())::date) THEN NULL::double precision
            ELSE sum((date_part('epoch'::text, us.time_out) - date_part('epoch'::text, us.time_in)))
        END AS total_time_passed,
    (sum((date_part('epoch'::text,
        CASE
            WHEN (us.time_out IS NULL) THEN CURRENT_TIMESTAMP
            ELSE (us.time_out)::timestamp with time zone
        END) - date_part('epoch'::text, us.time_in))))::integer AS total_time_passed_from_now,
    array_agg(DISTINCT (concat(bx.line_id, '__'))::character varying) AS lines_ids,
    array_agg(DISTINCT (concat(bx.box_id, '__'))::character varying) AS boxs_ids
   FROM ((((public.usersessions us
     LEFT JOIN public.boxes bx ON ((bx.box_id = us.box_id)))
     JOIN public.employees emp ON (((emp.emp_id = us.employee_id) AND (emp.active = 'Y'::text) AND (emp.job_id = 1))))
     LEFT JOIN public.views_user_online_by_day vuod ON (((vuod.employee_id = us.employee_id) AND (vuod.day_session = to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)))))
     LEFT JOIN public.views_user_in_break_by_day vuibd ON (((vuibd.employee_id = us.employee_id) AND (vuibd.day_break = to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)))))
  WHERE ((us.employee_id IS NOT NULL) AND (us.time_in IS NOT NULL) AND (us.active = 'Y'::text) AND ((us.time_in <= us.time_out) OR ((us.time_in IS NOT NULL) AND (us.time_out IS NULL))))
  GROUP BY us.employee_id, (to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)), vuod.employee_id, vuibd.employee_id
  ORDER BY (to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)) DESC;
 4   DROP VIEW public.views_user_sessions_status_by_day;
       public       marabout    false    423    209    327    327    327    327    327    209    222    222    209    421    421    423            �           1259    174381    views_employee_stats_by_day    VIEW     �  CREATE VIEW public.views_employee_stats_by_day AS
 SELECT vussd.employee_id,
    vussd.day_session,
    vussd.session_status,
    vussd.time_first_login,
    vussd.time_last_logout,
    vussd.total_time_passed,
    vussd.total_time_passed_from_now,
    vussd.lines_ids,
    vussd.boxs_ids,
    vebd.total_time_break,
    vebd.time_first_break,
    vebd.time_last_break,
    vebd.total_breaks,
    vcpsded.total_quantity,
    vcpsded.total_time_passed AS operation_total_time_passed,
    vcpsded.total_time_needed AS operation_total_time_needed,
    vcpsded.total_efficiency,
    ((vcpsded.total_time_needed / (
        CASE
            WHEN (vussd.time_last_logout IS NULL) THEN (vussd.total_time_passed_from_now)::double precision
            ELSE vussd.total_time_passed
        END -
        CASE
            WHEN (vebd.total_time_break IS NULL) THEN (0)::double precision
            ELSE vebd.total_time_break
        END)) * (100)::double precision) AS productivity,
    vussd.lines_ids AS list_lines_ids,
    vussd.boxs_ids AS list_boxs_ids
   FROM ((public.views_user_sessions_status_by_day vussd
     LEFT JOIN public.views_cps_data_by_employee_by_day vcpsded ON (((vcpsded.employee_id = vussd.employee_id) AND (vcpsded.date_operation = vussd.day_session))))
     LEFT JOIN public.views_employee_breaks_by_day vebd ON (((vebd.employee_id = vussd.employee_id) AND (vebd.day_break = vussd.day_session) AND (vebd.total_time_break > (0)::double precision))))
  ORDER BY vussd.day_session DESC;
 .   DROP VIEW public.views_employee_stats_by_day;
       public       marabout    false    425    425    425    425    425    417    417    417    419    425    417    417    419    419    419    419    419    425    425    425    417            �           1259    174357 "   views_user_in_break_by_day_by_line    VIEW     S  CREATE VIEW public.views_user_in_break_by_day_by_line AS
 SELECT to_char(((b.start_time)::date)::timestamp with time zone, 'yyyymmdd'::text) AS day_break,
    us.employee_id,
    bx.line_id
   FROM ((public.breaks b
     LEFT JOIN public.usersessions us ON ((us.usersession_id = b.usersession_id)))
     LEFT JOIN public.boxes bx ON ((bx.box_id = us.box_id)))
  WHERE ((b.active = 'Y'::text) AND (b.start_time IS NOT NULL) AND (b.end_time IS NULL) AND (us.active = 'Y'::text))
  GROUP BY (to_char(((b.start_time)::date)::timestamp with time zone, 'yyyymmdd'::text)), us.employee_id, bx.line_id;
 5   DROP VIEW public.views_user_in_break_by_day_by_line;
       public       marabout    false    267    267    327    222    222    327    327    327    267    267            �           1259    174366     views_user_online_by_day_by_line    VIEW     �  CREATE VIEW public.views_user_online_by_day_by_line AS
 SELECT us.employee_id,
    to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text) AS day_session,
    bx.line_id
   FROM (public.usersessions us
     LEFT JOIN public.boxes bx ON ((bx.box_id = us.box_id)))
  WHERE ((us.employee_id IS NOT NULL) AND (us.time_in IS NOT NULL) AND (us.active = 'Y'::text) AND ((us.time_in <= us.time_out) OR ((us.time_in IS NOT NULL) AND (us.time_out IS NULL))) AND (us.time_out IS NULL))
  GROUP BY us.employee_id, (to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)), bx.line_id
  ORDER BY (to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)) DESC;
 3   DROP VIEW public.views_user_online_by_day_by_line;
       public       marabout    false    327    327    327    327    327    222    222            �           1259    174376 )   views_user_sessions_status_by_day_by_line    VIEW     �  CREATE VIEW public.views_user_sessions_status_by_day_by_line AS
 SELECT us.employee_id,
    to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text) AS day_session,
        CASE
            WHEN (count(vuibdl.*) <> 0) THEN 'in_break'::text
            WHEN (vuodl.employee_id IS NULL) THEN 'offline'::text
            ELSE 'online'::text
        END AS session_status,
    min(us.time_in) AS time_first_login,
        CASE
            WHEN (max(COALESCE(us.time_out, ((now())::date)::timestamp without time zone)) = (now())::date) THEN NULL::timestamp without time zone
            ELSE max(us.time_out)
        END AS time_last_logout,
        CASE
            WHEN (max(COALESCE(us.time_out, ((now())::date)::timestamp without time zone)) = (now())::date) THEN NULL::double precision
            ELSE sum((date_part('epoch'::text, us.time_out) - date_part('epoch'::text, us.time_in)))
        END AS total_time_passed,
    (sum((date_part('epoch'::text,
        CASE
            WHEN (us.time_out IS NULL) THEN CURRENT_TIMESTAMP
            ELSE (us.time_out)::timestamp with time zone
        END) - date_part('epoch'::text, us.time_in))))::integer AS total_time_passed_from_now,
    bx.line_id,
    array_agg(DISTINCT (concat(bx.box_id, '__'))::character varying) AS boxs_ids
   FROM (((public.usersessions us
     LEFT JOIN public.boxes bx ON ((bx.box_id = us.box_id)))
     LEFT JOIN public.views_user_online_by_day_by_line vuodl ON (((vuodl.employee_id = us.employee_id) AND (vuodl.day_session = to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)) AND (bx.line_id = vuodl.line_id))))
     LEFT JOIN public.views_user_in_break_by_day_by_line vuibdl ON (((vuibdl.employee_id = us.employee_id) AND (vuibdl.day_break = to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)) AND (bx.line_id = vuibdl.line_id))))
  WHERE ((us.employee_id IS NOT NULL) AND (us.time_in IS NOT NULL) AND (us.active = 'Y'::text) AND ((us.time_in <= us.time_out) OR ((us.time_in IS NOT NULL) AND (us.time_out IS NULL))))
  GROUP BY us.employee_id, (to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)), bx.line_id, vuodl.employee_id
  ORDER BY (to_char(((us.time_in)::date)::timestamp with time zone, 'yyyymmdd'::text)) DESC;
 <   DROP VIEW public.views_user_sessions_status_by_day_by_line;
       public       marabout    false    327    424    424    424    422    422    422    327    327    327    327    222    222            �           1259    174386 #   views_employee_stats_by_day_by_line    VIEW     �  CREATE VIEW public.views_employee_stats_by_day_by_line AS
 SELECT vussdl.employee_id,
    vussdl.day_session,
    vussdl.session_status,
    vussdl.time_first_login,
    vussdl.time_last_logout,
    vussdl.total_time_passed,
    vussdl.total_time_passed_from_now,
    vussdl.line_id,
    vussdl.boxs_ids,
    vebdl.total_time_break,
    vebdl.time_first_break,
    vebdl.time_last_break,
    vebdl.total_breaks,
    vcpsdedl.total_quantity,
    vcpsdedl.total_time_passed AS operation_total_time_passed,
    vcpsdedl.total_time_needed AS operation_total_time_needed,
    vcpsdedl.total_efficiency,
    ((vcpsdedl.total_time_needed / (
        CASE
            WHEN (vussdl.time_last_logout IS NULL) THEN (vussdl.total_time_passed_from_now)::double precision
            ELSE vussdl.total_time_passed
        END - vebdl.total_time_break)) * (100)::double precision) AS productivity,
    vussdl.line_id AS employee_line_id
   FROM ((public.views_user_sessions_status_by_day_by_line vussdl
     LEFT JOIN public.views_cps_data_by_employee_by_day_by_line vcpsdedl ON (((vcpsdedl.employee_id = vussdl.employee_id) AND (vcpsdedl.date_operation = vussdl.day_session))))
     LEFT JOIN public.views_employee_breaks_by_day_by_line vebdl ON (((vebdl.employee_id = vussdl.employee_id) AND (vebdl.day_break = vussdl.day_session) AND (vebdl.total_time_break > (0)::double precision))))
  ORDER BY vussdl.day_session DESC;
 6   DROP VIEW public.views_employee_stats_by_day_by_line;
       public       marabout    false    426    418    426    418    418    418    418    418    420    420    420    420    420    420    426    426    426    426    426    426    426            �           1259    174294    views_maintenance_task_data    VIEW     �  CREATE VIEW public.views_maintenance_task_data AS
SELECT
    NULL::timestamp without time zone AS created_at,
    NULL::integer AS machine_id,
    NULL::integer AS department_id,
    NULL::text AS bug_description,
    NULL::integer AS owner_id,
    NULL::text AS active,
    NULL::integer AS created_by,
    NULL::integer AS maintenance_task_id,
    NULL::integer AS maintenance_status_id,
    NULL::text AS source,
    NULL::integer AS maintenance_template_id,
    NULL::integer AS repared_by,
    NULL::integer AS line_id,
    NULL::text AS day_maintenance_task,
    NULL::text AS day_last_maintenance_feed,
    NULL::text AS date_hour_maintenance_task,
    NULL::bigint AS count_feeds,
    NULL::timestamp without time zone AS first_maintenance_feed_start,
    NULL::timestamp without time zone AS last_maintenance_feed_end,
    NULL::bigint AS total_time_maintenance,
    NULL::double precision AS offline_duration;
 .   DROP VIEW public.views_maintenance_task_data;
       public       marabout    false            �           1259    174299 ,   views_mtsk_by_machine_by_day_by_group_status    VIEW     �  CREATE VIEW public.views_mtsk_by_machine_by_day_by_group_status AS
 SELECT vmtskd.machine_id,
    vmtskd.day_maintenance_task,
    max(vmtskd.offline_duration) AS max_offline_duration,
    min(vmtskd.offline_duration) AS min_offline_duration,
    sum(vmtskd.total_time_maintenance) AS total_time_maintenance,
        CASE
            WHEN (vmtskd.maintenance_status_id = 1) THEN 'repared'::text
            ELSE 'not_repared'::text
        END AS maintenance_group_status
   FROM public.views_maintenance_task_data vmtskd
  GROUP BY vmtskd.machine_id, vmtskd.day_maintenance_task,
        CASE
            WHEN (vmtskd.maintenance_status_id = 1) THEN 'repared'::text
            ELSE 'not_repared'::text
        END;
 ?   DROP VIEW public.views_mtsk_by_machine_by_day_by_group_status;
       public       marabout    false    409    409    409    409    409            �           1259    174307 '   views_maintenance_duration_total_by_day    VIEW     �  CREATE VIEW public.views_maintenance_duration_total_by_day AS
 SELECT vmtskmdgs.day_maintenance_task,
    sum(vmtskmdgs.max_offline_duration) AS total_offline_duration,
    sum(vmtskmdgs.total_time_maintenance) AS total_time_maintenance,
    (sum(vmtskmdgs.max_offline_duration) - (sum(vmtskmdgs.total_time_maintenance))::double precision) AS total_time_on_hold
   FROM public.views_mtsk_by_machine_by_day_by_group_status vmtskmdgs
  GROUP BY vmtskmdgs.day_maintenance_task;
 :   DROP VIEW public.views_maintenance_duration_total_by_day;
       public       marabout    false    410    410    410            �           1259    174303 6   views_mtsk_by_machine_by_day_by_group_status_by_source    VIEW     �  CREATE VIEW public.views_mtsk_by_machine_by_day_by_group_status_by_source AS
 SELECT vmtskd.machine_id,
    vmtskd.day_maintenance_task,
    vmtskd.source,
    max(vmtskd.offline_duration) AS max_offline_duration,
    min(vmtskd.offline_duration) AS min_offline_duration,
    sum(vmtskd.total_time_maintenance) AS total_time_maintenance,
        CASE
            WHEN (vmtskd.maintenance_status_id = 1) THEN 'repared'::text
            ELSE 'not_repared'::text
        END AS maintenance_group_status
   FROM public.views_maintenance_task_data vmtskd
  GROUP BY vmtskd.machine_id, vmtskd.day_maintenance_task, vmtskd.source,
        CASE
            WHEN (vmtskd.maintenance_status_id = 1) THEN 'repared'::text
            ELSE 'not_repared'::text
        END;
 I   DROP VIEW public.views_mtsk_by_machine_by_day_by_group_status_by_source;
       public       marabout    false    409    409    409    409    409    409            �           1259    174311 1   views_maintenance_duration_total_by_day_by_source    VIEW        CREATE VIEW public.views_maintenance_duration_total_by_day_by_source AS
 SELECT vmtskmdgss.day_maintenance_task,
    vmtskmdgss.source,
    sum(vmtskmdgss.max_offline_duration) AS total_offline_duration,
    sum(vmtskmdgss.total_time_maintenance) AS total_time_maintenance,
    (sum(vmtskmdgss.max_offline_duration) - (sum(vmtskmdgss.total_time_maintenance))::double precision) AS total_time_on_hold
   FROM public.views_mtsk_by_machine_by_day_by_group_status_by_source vmtskmdgss
  GROUP BY vmtskmdgss.day_maintenance_task, vmtskmdgss.source;
 D   DROP VIEW public.views_maintenance_duration_total_by_day_by_source;
       public       marabout    false    411    411    411    411            �           1259    174315    views_mtsk_unplanned    VIEW     F  CREATE VIEW public.views_mtsk_unplanned AS
 SELECT vmtskd.created_at,
    vmtskd.machine_id,
    vmtskd.department_id,
    vmtskd.bug_description,
    vmtskd.owner_id,
    vmtskd.active,
    vmtskd.created_by,
    vmtskd.maintenance_task_id,
    vmtskd.maintenance_status_id,
    vmtskd.source,
    vmtskd.maintenance_template_id,
    vmtskd.repared_by,
    vmtskd.line_id,
    vmtskd.day_maintenance_task,
    vmtskd.day_last_maintenance_feed,
    vmtskd.date_hour_maintenance_task,
    vmtskd.count_feeds,
    vmtskd.first_maintenance_feed_start,
    vmtskd.last_maintenance_feed_end,
    vmtskd.total_time_maintenance,
    vmtskd.offline_duration
   FROM public.views_maintenance_task_data vmtskd
  WHERE ((vmtskd.maintenance_status_id = ANY (ARRAY[2, 3, 4])) AND (lower(vmtskd.source) = 'manuel'::text))
  ORDER BY vmtskd.created_at;
 '   DROP VIEW public.views_mtsk_unplanned;
       public       marabout    false    409    409    409    409    409    409    409    409    409    409    409    409    409    409    409    409    409    409    409    409    409            x           1259    140372    views_number_operation_by_day    VIEW     �  CREATE VIEW public.views_number_operation_by_day AS
 SELECT count(cop.operation_id) AS number_of_operations,
    to_date(to_char(cop.datestart, 'YYYY/MM/DD'::text), 'YYYY/MM/DD'::text) AS date_operation
   FROM public.operations op,
    public.cart_pending_operations cop,
    public.cart_pending_sessions cps
  WHERE ((op.operation_id = cop.operation_id) AND (cps.cart_pendingoperation_id = cop.cart_pending_operation_id))
  GROUP BY (to_date(to_char(cop.datestart, 'YYYY/MM/DD'::text), 'YYYY/MM/DD'::text));
 0   DROP VIEW public.views_number_operation_by_day;
       public       marabout    false    279    294    284    279    279            u           1259    140308     views_operator_login_time_by_day    VIEW       CREATE VIEW public.views_operator_login_time_by_day AS
SELECT
    NULL::integer AS usersession_id,
    NULL::timestamp without time zone AS first_login,
    NULL::timestamp without time zone AS last_logout,
    NULL::double precision AS time_passed,
    NULL::text AS date_login;
 3   DROP VIEW public.views_operator_login_time_by_day;
       public       marabout    false            �           1259    174320    views_production_data    VIEW     �  CREATE VIEW public.views_production_data AS
 SELECT cpo.bundle_id,
    b.bundle_qte,
    sum(op.quantity) AS operations_quantity,
    count(op.operation_id) AS operations_count,
    min(cpo.quantity) AS min_quantity_produced,
    max(cpo.quantity) AS max_quantity_produced,
    max(cpo2.quantity) AS quantity_in_production,
    sum(cpo.finished) AS total_finished,
        CASE
            WHEN (sum(cpo.finished) = count(op.operation_id)) THEN 1
            ELSE 0
        END AS operations_finished
   FROM (((public.bundles b
     LEFT JOIN public.operations op ON (((op.bundle_id = b.bundle_id) AND (op.active = 'Y'::text))))
     LEFT JOIN public.cart_pending_operations cpo ON (((op.operation_id = cpo.operation_id) AND (cpo.active = 'Y'::text))))
     LEFT JOIN public.cart_pending_operations cpo2 ON (((op.operation_id = cpo2.operation_id) AND (cpo2.active = 'Y'::text) AND (cpo2.finished = 0))))
  WHERE (b.active = 'Y'::text)
  GROUP BY cpo.bundle_id, b.bundle_qte;
 (   DROP VIEW public.views_production_data;
       public       marabout    false    272    272    272    279    279    279    279    279    294    294    294    294            i           1259    140120 -   views_stats_machine_session_operations_by_day    VIEW     k  CREATE VIEW public.views_stats_machine_session_operations_by_day AS
 SELECT mso.machine_id,
    min(mso.time_in) AS first_operation_in,
    max(mso.time_out) AS last_operation_out,
    sum(mso.stitchcount) AS total_stitchcount,
    sum(mso.quantity) AS total_quantity,
    sum((date_part('epoch'::text, mso.time_out) - date_part('epoch'::text, mso.time_in))) AS time_passed,
    to_char(mso.time_in, 'YYYYMMDD'::text) AS date_operations
   FROM public.machine_session_operations mso
  WHERE ((mso.time_out IS NOT NULL) AND (mso.time_in IS NOT NULL))
  GROUP BY mso.machine_id, (to_char(mso.time_in, 'YYYYMMDD'::text));
 @   DROP VIEW public.views_stats_machine_session_operations_by_day;
       public       marabout    false    360    360    360    360    360            j           1259    140124 #   views_stats_machine_sessions_by_day    VIEW       CREATE VIEW public.views_stats_machine_sessions_by_day WITH (security_barrier='false') AS
 SELECT ms.machine_id,
    to_char(ms.time_in, 'YYYYMMDD'::text) AS date_machine_session,
    sum((date_part('epoch'::text, ms.time_out) - date_part('epoch'::text, ms.time_in))) AS time_login_passed,
    vsmsod.time_passed AS total_operation_time_passed,
    (sum((date_part('epoch'::text, ms.time_out) - date_part('epoch'::text, ms.time_in))) - vsmsod.time_passed) AS total_down_time,
    min(ms.time_in) AS first_login,
    max(ms.time_out) AS last_logout
   FROM (public.machine_sessions ms
     LEFT JOIN public.views_stats_machine_session_operations_by_day vsmsod ON (((vsmsod.machine_id = ms.machine_id) AND (vsmsod.time_passed IS NOT NULL))))
  WHERE ((ms.time_out IS NOT NULL) AND (ms.time_in IS NOT NULL) AND (vsmsod.date_operations = to_char(ms.time_in, 'YYYYMMDD'::text)))
  GROUP BY ms.machine_id, (to_char(ms.time_in, 'YYYYMMDD'::text)), vsmsod.time_passed
  ORDER BY (to_char(ms.time_in, 'YYYYMMDD'::text)) DESC, ms.machine_id;
 6   DROP VIEW public.views_stats_machine_sessions_by_day;
       public       marabout    false    361    361    361    358    358    358            k           1259    140131 !   views_stats_machine_uptime_by_day    VIEW     �  CREATE VIEW public.views_stats_machine_uptime_by_day AS
 SELECT machine_events.machine_id,
    min(machine_events.date_time_event_start) AS turn_on,
    max(machine_events.date_time_event_end) AS turn_off,
    to_char(machine_events.date_time_event_start, 'YYYYMMDD'::text) AS to_char,
    sum((date_part('epoch'::text, machine_events.date_time_event_end) - date_part('epoch'::text, machine_events.date_time_event_start))) AS uptime
   FROM public.machine_events
  WHERE ((machine_events.event_id = 6) AND (machine_events.date_time_event_start IS NOT NULL) AND (machine_events.date_time_event_end IS NOT NULL))
  GROUP BY machine_events.machine_id, (to_char(machine_events.date_time_event_start, 'YYYYMMDD'::text));
 4   DROP VIEW public.views_stats_machine_uptime_by_day;
       public       marabout    false    252    252    252    252            }           1259    140624 '   views_time_operation_per_session_by_day    VIEW     �  CREATE VIEW public.views_time_operation_per_session_by_day AS
 SELECT cop.operation_id,
    cps.session_id,
    sum((date_part('epoch'::text, cop.dateend) - date_part('epoch'::text, cop.datestart))) AS operation_time,
    to_date(to_char(cop.datestart, 'YYYY/MM/DD'::text), 'YYYY/MM/DD'::text) AS date_operation
   FROM public.operations op,
    public.cart_pending_operations cop,
    public.cart_pending_sessions cps
  WHERE ((op.operation_id = cop.operation_id) AND (cps.cart_pendingoperation_id = cop.cart_pending_operation_id))
  GROUP BY (to_date(to_char(cop.datestart, 'YYYY/MM/DD'::text), 'YYYY/MM/DD'::text)), op.operation_id, cps.session_id, cop.operation_id;
 :   DROP VIEW public.views_time_operation_per_session_by_day;
       public       marabout    false    279    294    284    279    284    279    279            J           1259    83658 	   workfiles    TABLE     �   CREATE TABLE public.workfiles (
    wfid integer,
    duration double precision,
    type character varying(45),
    workfiles_id integer NOT NULL,
    active text,
    datestart date,
    dateend date
);
    DROP TABLE public.workfiles;
       public         marabout    false            H           1259    83644    workfiles_id_seq    SEQUENCE     y   CREATE SEQUENCE public.workfiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.workfiles_id_seq;
       public       marabout    false            K           1259    83662    workfiles_workfiles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.workfiles_workfiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.workfiles_workfiles_id_seq;
       public       marabout    false    330            �           0    0    workfiles_workfiles_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.workfiles_workfiles_id_seq OWNED BY public.workfiles.workfiles_id;
            public       marabout    false    331            x           2604    123790 9   article_operation_templates article_operation_template_id    DEFAULT     �   ALTER TABLE ONLY public.article_operation_templates ALTER COLUMN article_operation_template_id SET DEFAULT nextval('public.article_operation_templates_article_operation_template_id_seq'::regclass);
 h   ALTER TABLE public.article_operation_templates ALTER COLUMN article_operation_template_id DROP DEFAULT;
       public       marabout    false    355    356    356                       2604    83673    articles article_id    DEFAULT     y   ALTER TABLE ONLY public.articles ALTER COLUMN article_id SET DEFAULT nextval('public.article_article_id_seq'::regclass);
 B   ALTER TABLE public.articles ALTER COLUMN article_id DROP DEFAULT;
       public       marabout    false    332    265            �           2604    74808    box_types bt_id    DEFAULT     r   ALTER TABLE ONLY public.box_types ALTER COLUMN bt_id SET DEFAULT nextval('public.box_types_bt_id_seq'::regclass);
 >   ALTER TABLE public.box_types ALTER COLUMN bt_id DROP DEFAULT;
       public       marabout    false    238    227            �           2604    66255    boxes box_id    DEFAULT     o   ALTER TABLE ONLY public.boxes ALTER COLUMN box_id SET DEFAULT nextval('public."Boxes1_Box_id_seq"'::regclass);
 ;   ALTER TABLE public.boxes ALTER COLUMN box_id DROP DEFAULT;
       public       marabout    false    222    221    222            v           2604    123726 !   break_type_categories category_id    DEFAULT     �   ALTER TABLE ONLY public.break_type_categories ALTER COLUMN category_id SET DEFAULT nextval('public.break_type_categories_category_id_seq'::regclass);
 P   ALTER TABLE public.break_type_categories ALTER COLUMN category_id DROP DEFAULT;
       public       marabout    false    352    351    352            	           2604    83708    break_types break_type_id    DEFAULT     �   ALTER TABLE ONLY public.break_types ALTER COLUMN break_type_id SET DEFAULT nextval('public.break_type_break_type_id_seq'::regclass);
 H   ALTER TABLE public.break_types ALTER COLUMN break_type_id DROP DEFAULT;
       public       marabout    false    333    270                       2604    83130    breaks break_id    DEFAULT     q   ALTER TABLE ONLY public.breaks ALTER COLUMN break_id SET DEFAULT nextval('public.break_break_id_seq'::regclass);
 >   ALTER TABLE public.breaks ALTER COLUMN break_id DROP DEFAULT;
       public       marabout    false    269    267                       2604    83220    bundle_carts bundle_cart_id    DEFAULT     �   ALTER TABLE ONLY public.bundle_carts ALTER COLUMN bundle_cart_id SET DEFAULT nextval('public.bundle_cart_bundle_cart_id_seq'::regclass);
 J   ALTER TABLE public.bundle_carts ALTER COLUMN bundle_cart_id DROP DEFAULT;
       public       marabout    false    281    275                       2604    83176    bundles bundle_id    DEFAULT     u   ALTER TABLE ONLY public.bundles ALTER COLUMN bundle_id SET DEFAULT nextval('public.bundle_bundle_id_seq'::regclass);
 @   ALTER TABLE public.bundles ALTER COLUMN bundle_id DROP DEFAULT;
       public       marabout    false    274    272            (           2604    83239 1   cart_pending_operations cart_pending_operation_id    DEFAULT     �   ALTER TABLE ONLY public.cart_pending_operations ALTER COLUMN cart_pending_operation_id SET DEFAULT nextval('public.cart_pending_operation_cart_pending_operation_id_seq'::regclass);
 `   ALTER TABLE public.cart_pending_operations ALTER COLUMN cart_pending_operation_id DROP DEFAULT;
       public       marabout    false    283    279            +           2604    83263 -   cart_pending_sessions cart_pending_session_id    DEFAULT     �   ALTER TABLE ONLY public.cart_pending_sessions ALTER COLUMN cart_pending_session_id SET DEFAULT nextval('public.cart_pending_session_cart_pending_session_id_seq'::regclass);
 \   ALTER TABLE public.cart_pending_sessions ALTER COLUMN cart_pending_session_id DROP DEFAULT;
       public       marabout    false    286    284            /           2604    83286 3   cart_reopened_operations cart_reopened_operation_id    DEFAULT     �   ALTER TABLE ONLY public.cart_reopened_operations ALTER COLUMN cart_reopened_operation_id SET DEFAULT nextval('public.cart_reopened_operation_cart_reopened_operation_id_seq'::regclass);
 b   ALTER TABLE public.cart_reopened_operations ALTER COLUMN cart_reopened_operation_id DROP DEFAULT;
       public       marabout    false    289    287            %           2604    83228    carts cart_id    DEFAULT     m   ALTER TABLE ONLY public.carts ALTER COLUMN cart_id SET DEFAULT nextval('public.cart_cart_id_seq'::regclass);
 <   ALTER TABLE public.carts ALTER COLUMN cart_id DROP DEFAULT;
       public       marabout    false    282    277            �           2604    24672    clients client_id    DEFAULT     o   ALTER TABLE ONLY public.clients ALTER COLUMN client_id SET DEFAULT nextval('public.clients_id_seq'::regclass);
 @   ALTER TABLE public.clients ALTER COLUMN client_id DROP DEFAULT;
       public       marabout    false    196    197    197            �           2604    40978    countries country_id    DEFAULT     t   ALTER TABLE ONLY public.countries ALTER COLUMN country_id SET DEFAULT nextval('public.countries_id_seq'::regclass);
 C   ALTER TABLE public.countries ALTER COLUMN country_id DROP DEFAULT;
       public       marabout    false    217    216    217            �           2604    74901    efiles file_id    DEFAULT     o   ALTER TABLE ONLY public.efiles ALTER COLUMN file_id SET DEFAULT nextval('public.efile_file_id_seq'::regclass);
 =   ALTER TABLE public.efiles ALTER COLUMN file_id DROP DEFAULT;
       public       marabout    false    245    246    246            �           2604    32914    employees emp_id    DEFAULT     p   ALTER TABLE ONLY public.employees ALTER COLUMN emp_id SET DEFAULT nextval('public.employees_id_seq'::regclass);
 ?   ALTER TABLE public.employees ALTER COLUMN emp_id DROP DEFAULT;
       public       marabout    false    208    209    209            �           2604    33319    employees job_id    DEFAULT     u   ALTER TABLE ONLY public.employees ALTER COLUMN job_id SET DEFAULT nextval('public.employees_task_id_seq'::regclass);
 ?   ALTER TABLE public.employees ALTER COLUMN job_id DROP DEFAULT;
       public       marabout    false    210    209            �           2604    33455    erp_sections esec_id    DEFAULT     p   ALTER TABLE ONLY public.erp_sections ALTER COLUMN esec_id SET DEFAULT nextval('public.menus_id_seq'::regclass);
 C   ALTER TABLE public.erp_sections ALTER COLUMN esec_id DROP DEFAULT;
       public       marabout    false    214    215    215            �           2604    82814    events event_id    DEFAULT     r   ALTER TABLE ONLY public.events ALTER COLUMN event_id SET DEFAULT nextval('public.events_event_id_seq'::regclass);
 >   ALTER TABLE public.events ALTER COLUMN event_id DROP DEFAULT;
       public       marabout    false    253    254    254                       2604    83040    events_ms events_ms_id    DEFAULT     �   ALTER TABLE ONLY public.events_ms ALTER COLUMN events_ms_id SET DEFAULT nextval('public.events_ms_events_ms_id_seq'::regclass);
 E   ALTER TABLE public.events_ms ALTER COLUMN events_ms_id DROP DEFAULT;
       public       marabout    false    263    264    264                       2604    83000    events_ops id_event_op    DEFAULT     �   ALTER TABLE ONLY public.events_ops ALTER COLUMN id_event_op SET DEFAULT nextval('public.events_ops_id_event_op_seq'::regclass);
 E   ALTER TABLE public.events_ops ALTER COLUMN id_event_op DROP DEFAULT;
       public       marabout    false    259    260    260            �           2604    74747    gateway_types gwt_id    DEFAULT     |   ALTER TABLE ONLY public.gateway_types ALTER COLUMN gwt_id SET DEFAULT nextval('public.gateway_types_gwt_id_seq'::regclass);
 C   ALTER TABLE public.gateway_types ALTER COLUMN gwt_id DROP DEFAULT;
       public       marabout    false    237    224            �           2604    74832    gateways gw_id    DEFAULT     p   ALTER TABLE ONLY public.gateways ALTER COLUMN gw_id SET DEFAULT nextval('public.gateways_gw_id_seq'::regclass);
 =   ALTER TABLE public.gateways ALTER COLUMN gw_id DROP DEFAULT;
       public       marabout    false    239    223            9           2604    83831    gpdworks gpdwork_id    DEFAULT     z   ALTER TABLE ONLY public.gpdworks ALTER COLUMN gpdwork_id SET DEFAULT nextval('public.gpdworks_gpdwork_id_seq'::regclass);
 B   ALTER TABLE public.gpdworks ALTER COLUMN gpdwork_id DROP DEFAULT;
       public       marabout    false    336    290            �           2604    24722    groups group_id    DEFAULT     l   ALTER TABLE ONLY public.groups ALTER COLUMN group_id SET DEFAULT nextval('public.groups_id_seq'::regclass);
 >   ALTER TABLE public.groups ALTER COLUMN group_id DROP DEFAULT;
       public       marabout    false    200    201    201            �           2604    33388    groups site_id    DEFAULT     p   ALTER TABLE ONLY public.groups ALTER COLUMN site_id SET DEFAULT nextval('public.groups_site_id_seq'::regclass);
 =   ALTER TABLE public.groups ALTER COLUMN site_id DROP DEFAULT;
       public       marabout    false    211    201            �           2604    173923 "   has_permissions has_permissions_id    DEFAULT     �   ALTER TABLE ONLY public.has_permissions ALTER COLUMN has_permissions_id SET DEFAULT nextval('public.has_permissions_id_seq'::regclass);
 Q   ALTER TABLE public.has_permissions ALTER COLUMN has_permissions_id DROP DEFAULT;
       public       marabout    false    408    250            B           2604    83733    import_logs import_log_id    DEFAULT     �   ALTER TABLE ONLY public.import_logs ALTER COLUMN import_log_id SET DEFAULT nextval('public."  import_logs_import_log_id_seq"'::regclass);
 H   ALTER TABLE public.import_logs ALTER COLUMN import_log_id DROP DEFAULT;
       public       marabout    false    334    292            �           2604    32887    jobs job_id    DEFAULT     g   ALTER TABLE ONLY public.jobs ALTER COLUMN job_id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 :   ALTER TABLE public.jobs ALTER COLUMN job_id DROP DEFAULT;
       public       marabout    false    207    206    207            �           2604    57351    lines line_id    DEFAULT     j   ALTER TABLE ONLY public.lines ALTER COLUMN line_id SET DEFAULT nextval('public.chains_id_seq'::regclass);
 <   ALTER TABLE public.lines ALTER COLUMN line_id DROP DEFAULT;
       public       marabout    false    219    218    219            �           2604    82803    machine_events machine_evt_id    DEFAULT     �   ALTER TABLE ONLY public.machine_events ALTER COLUMN machine_evt_id SET DEFAULT nextval('public.machine_events_machine_evt_id_seq'::regclass);
 L   ALTER TABLE public.machine_events ALTER COLUMN machine_evt_id DROP DEFAULT;
       public       marabout    false    251    252    252            r           2604    90979    machine_groups machine_group_id    DEFAULT     �   ALTER TABLE ONLY public.machine_groups ALTER COLUMN machine_group_id SET DEFAULT nextval('public.machine_groups_machine_group_id_seq'::regclass);
 N   ALTER TABLE public.machine_groups ALTER COLUMN machine_group_id DROP DEFAULT;
       public       marabout    false    344    343    344            �           2604    140292 =   machine_light_status_sessions machine_light_status_session_id    DEFAULT     �   ALTER TABLE ONLY public.machine_light_status_sessions ALTER COLUMN machine_light_status_session_id SET DEFAULT nextval('public.machine_light_status_sessions_machine_light_status_session__seq'::regclass);
 l   ALTER TABLE public.machine_light_status_sessions ALTER COLUMN machine_light_status_session_id DROP DEFAULT;
       public       marabout    false    371    372    372            z           2604    123825 -   machine_session_operations machine_sess_op_id    DEFAULT     �   ALTER TABLE ONLY public.machine_session_operations ALTER COLUMN machine_sess_op_id SET DEFAULT nextval('public.machine_session_operations_machine_sess_op_id_seq'::regclass);
 \   ALTER TABLE public.machine_session_operations ALTER COLUMN machine_sess_op_id DROP DEFAULT;
       public       marabout    false    359    360    360            y           2604    123811 #   machine_sessions machine_session_id    DEFAULT     �   ALTER TABLE ONLY public.machine_sessions ALTER COLUMN machine_session_id SET DEFAULT nextval('public.machine_sessions_machine_session_id_seq'::regclass);
 R   ALTER TABLE public.machine_sessions ALTER COLUMN machine_session_id DROP DEFAULT;
       public       marabout    false    358    357    358            u           2604    99154    machine_types machine_type_id    DEFAULT     �   ALTER TABLE ONLY public.machine_types ALTER COLUMN machine_type_id SET DEFAULT nextval('public.machine_types_machine_type_id_seq'::regclass);
 L   ALTER TABLE public.machine_types ALTER COLUMN machine_type_id DROP DEFAULT;
       public       marabout    false    350    349    350            �           2604    32775    machines machine_id    DEFAULT     r   ALTER TABLE ONLY public.machines ALTER COLUMN machine_id SET DEFAULT nextval('public.machines_id_seq'::regclass);
 B   ALTER TABLE public.machines ALTER COLUMN machine_id DROP DEFAULT;
       public       marabout    false    205    204    205            �           2604    164809 %   maintenance_feeds maintenance_feed_id    DEFAULT     �   ALTER TABLE ONLY public.maintenance_feeds ALTER COLUMN maintenance_feed_id SET DEFAULT nextval('public.maintenance_feeds_maintenance_feed_id_seq'::regclass);
 T   ALTER TABLE public.maintenance_feeds ALTER COLUMN maintenance_feed_id DROP DEFAULT;
       public       marabout    false    403    385            �           2604    164821 %   maintenance_tasks maintenance_task_id    DEFAULT     �   ALTER TABLE ONLY public.maintenance_tasks ALTER COLUMN maintenance_task_id SET DEFAULT nextval('public.maintenance_tasks_maintenance_task_id_seq'::regclass);
 T   ALTER TABLE public.maintenance_tasks ALTER COLUMN maintenance_task_id DROP DEFAULT;
       public       marabout    false    404    383            �           2604    164837 -   maintenance_templates maintenance_template_id    DEFAULT     �   ALTER TABLE ONLY public.maintenance_templates ALTER COLUMN maintenance_template_id SET DEFAULT nextval('public.maintenance_templates_maintenance_template_id_seq'::regclass);
 \   ALTER TABLE public.maintenance_templates ALTER COLUMN maintenance_template_id DROP DEFAULT;
       public       marabout    false    405    392                       2604    83029 "   mechanic_events mechanic_events_id    DEFAULT     �   ALTER TABLE ONLY public.mechanic_events ALTER COLUMN mechanic_events_id SET DEFAULT nextval('public.mechanic_events_mechanic_events_id_seq'::regclass);
 Q   ALTER TABLE public.mechanic_events ALTER COLUMN mechanic_events_id DROP DEFAULT;
       public       marabout    false    262    261    262            �           2604    164693 '   notification_reads notification_read_id    DEFAULT     �   ALTER TABLE ONLY public.notification_reads ALTER COLUMN notification_read_id SET DEFAULT nextval('public.notification_reads_notification_read_id_seq'::regclass);
 V   ALTER TABLE public.notification_reads ALTER COLUMN notification_read_id DROP DEFAULT;
       public       marabout    false    396    378            �           2604    164704    notifications notification_id    DEFAULT     �   ALTER TABLE ONLY public.notifications ALTER COLUMN notification_id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);
 L   ALTER TABLE public.notifications ALTER COLUMN notification_id DROP DEFAULT;
       public       marabout    false    397    377            �           2604    164772    observations observation_id    DEFAULT     �   ALTER TABLE ONLY public.observations ALTER COLUMN observation_id SET DEFAULT nextval('public.observations_observation_id_seq'::regclass);
 J   ALTER TABLE public.observations ALTER COLUMN observation_id DROP DEFAULT;
       public       marabout    false    401    374            G           2604    83867 %   operation_groupes operation_groupe_id    DEFAULT     �   ALTER TABLE ONLY public.operation_groupes ALTER COLUMN operation_groupe_id SET DEFAULT nextval('public.operation_groupes_operation_groupe_id_seq'::regclass);
 T   ALTER TABLE public.operation_groupes ALTER COLUMN operation_groupe_id DROP DEFAULT;
       public       marabout    false    337    296            w           2604    123769 )   operation_templates operation_template_id    DEFAULT     �   ALTER TABLE ONLY public.operation_templates ALTER COLUMN operation_template_id SET DEFAULT nextval('public.operation_templates_operation_template_id_seq'::regclass);
 X   ALTER TABLE public.operation_templates ALTER COLUMN operation_template_id DROP DEFAULT;
       public       marabout    false    353    354    354            D           2604    83750    operations operation_id    DEFAULT     �   ALTER TABLE ONLY public.operations ALTER COLUMN operation_id SET DEFAULT nextval('public.operations_operation_id_seq'::regclass);
 F   ALTER TABLE public.operations ALTER COLUMN operation_id DROP DEFAULT;
       public       marabout    false    335    294                       2604    82989    operator_events id_op_event    DEFAULT     �   ALTER TABLE ONLY public.operator_events ALTER COLUMN id_op_event SET DEFAULT nextval('public.operator_events_id_op_event_seq'::regclass);
 J   ALTER TABLE public.operator_events ALTER COLUMN id_op_event DROP DEFAULT;
       public       marabout    false    257    258    258            H           2604    83933 -   operatorproductivitys operatorproductivity_id    DEFAULT     �   ALTER TABLE ONLY public.operatorproductivitys ALTER COLUMN operatorproductivity_id SET DEFAULT nextval('public.operatorproductivitys_operatorproductivity_id_seq'::regclass);
 \   ALTER TABLE public.operatorproductivitys ALTER COLUMN operatorproductivity_id DROP DEFAULT;
       public       marabout    false    340    298            J           2604    83415    orders order_id    DEFAULT     q   ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.ordre_ordre_id_seq'::regclass);
 >   ALTER TABLE public.orders ALTER COLUMN order_id DROP DEFAULT;
       public       marabout    false    302    300            �           2604    74851    permissions permission_id    DEFAULT     �   ALTER TABLE ONLY public.permissions ALTER COLUMN permission_id SET DEFAULT nextval('public.permissions_permission_id_seq'::regclass);
 H   ALTER TABLE public.permissions ALTER COLUMN permission_id DROP DEFAULT;
       public       marabout    false    241    240    241                        2604    82848    printers printer_id    DEFAULT     z   ALTER TABLE ONLY public.printers ALTER COLUMN printer_id SET DEFAULT nextval('public.printers_printer_id_seq'::regclass);
 B   ALTER TABLE public.printers ALTER COLUMN printer_id DROP DEFAULT;
       public       marabout    false    255    256    256            �           2604    166154    priorities id_priority    DEFAULT     �   ALTER TABLE ONLY public.priorities ALTER COLUMN id_priority SET DEFAULT nextval('public.priorities_id_priority_seq'::regclass);
 E   ALTER TABLE public.priorities ALTER COLUMN id_priority DROP DEFAULT;
       public       marabout    false    407    391            �           2604    74610    profiles profile_id    DEFAULT     z   ALTER TABLE ONLY public.profiles ALTER COLUMN profile_id SET DEFAULT nextval('public.profiles_profile_id_seq'::regclass);
 B   ALTER TABLE public.profiles ALTER COLUMN profile_id DROP DEFAULT;
       public       marabout    false    231    232    232            P           2604    83434    reports report_id    DEFAULT     u   ALTER TABLE ONLY public.reports ALTER COLUMN report_id SET DEFAULT nextval('public.report_report_id_seq'::regclass);
 @   ALTER TABLE public.reports ALTER COLUMN report_id DROP DEFAULT;
       public       marabout    false    304    303            q           2604    83925    revision_events id_revision    DEFAULT     �   ALTER TABLE ONLY public.revision_events ALTER COLUMN id_revision SET DEFAULT nextval('public.revision_events_id_revision_seq'::regclass);
 J   ALTER TABLE public.revision_events ALTER COLUMN id_revision DROP DEFAULT;
       public       marabout    false    339    338    339            �           2604    75189    revision_machine revision_id    DEFAULT     �   ALTER TABLE ONLY public.revision_machine ALTER COLUMN revision_id SET DEFAULT nextval('public.revision_machine_revision_id_seq'::regclass);
 K   ALTER TABLE public.revision_machine ALTER COLUMN revision_id DROP DEFAULT;
       public       marabout    false    248    247    248            W           2604    83476    romboldtxts romboldtxt_id    DEFAULT     �   ALTER TABLE ONLY public.romboldtxts ALTER COLUMN romboldtxt_id SET DEFAULT nextval('public.romboldtxt_romboldtxt_id_seq'::regclass);
 H   ALTER TABLE public.romboldtxts ALTER COLUMN romboldtxt_id DROP DEFAULT;
       public       marabout    false    307    305            �           2604    140610 )   sequence_operations sequence_operation_id    DEFAULT     �   ALTER TABLE ONLY public.sequence_operations ALTER COLUMN sequence_operation_id SET DEFAULT nextval('public.sequence_operations_sequence_operation_id_seq'::regclass);
 X   ALTER TABLE public.sequence_operations ALTER COLUMN sequence_operation_id DROP DEFAULT;
       public       marabout    false    380    379                       2604    140243    sequences sequence_id    DEFAULT     ~   ALTER TABLE ONLY public.sequences ALTER COLUMN sequence_id SET DEFAULT nextval('public.sequences_sequence_id_seq'::regclass);
 D   ALTER TABLE public.sequences ALTER COLUMN sequence_id DROP DEFAULT;
       public       marabout    false    368    369    369            �           2604    33433    servers server_id    DEFAULT     o   ALTER TABLE ONLY public.servers ALTER COLUMN server_id SET DEFAULT nextval('public.servers_id_seq'::regclass);
 @   ALTER TABLE public.servers ALTER COLUMN server_id DROP DEFAULT;
       public       marabout    false    212    213    213            �           2604    24706    sites site_id    DEFAULT     i   ALTER TABLE ONLY public.sites ALTER COLUMN site_id SET DEFAULT nextval('public.sites_id_seq'::regclass);
 <   ALTER TABLE public.sites ALTER COLUMN site_id DROP DEFAULT;
       public       marabout    false    199    198    199            t           2604    91050 !   skill_employees skill_employee_id    DEFAULT     �   ALTER TABLE ONLY public.skill_employees ALTER COLUMN skill_employee_id SET DEFAULT nextval('public.skill_employees_skill_employee_id_seq'::regclass);
 P   ALTER TABLE public.skill_employees ALTER COLUMN skill_employee_id DROP DEFAULT;
       public       marabout    false    347    348    348            s           2604    91032    skills skill_id    DEFAULT     r   ALTER TABLE ONLY public.skills ALTER COLUMN skill_id SET DEFAULT nextval('public.skills_skill_id_seq'::regclass);
 >   ALTER TABLE public.skills ALTER COLUMN skill_id DROP DEFAULT;
       public       marabout    false    345    346    346            e           2604    83986    stat_days stat_day_id    DEFAULT     ~   ALTER TABLE ONLY public.stat_days ALTER COLUMN stat_day_id SET DEFAULT nextval('public.stat_days_stat_day_id_seq'::regclass);
 D   ALTER TABLE public.stat_days ALTER COLUMN stat_day_id DROP DEFAULT;
       public       marabout    false    341    308            f           2604    83516    stat_hours stat_hour_id    DEFAULT     �   ALTER TABLE ONLY public.stat_hours ALTER COLUMN stat_hour_id SET DEFAULT nextval('public.stat_hour_stat_hour_id_seq'::regclass);
 F   ALTER TABLE public.stat_hours ALTER COLUMN stat_hour_id DROP DEFAULT;
       public       marabout    false    312    310            g           2604    83997    stat_insts stat_inst_id    DEFAULT     �   ALTER TABLE ONLY public.stat_insts ALTER COLUMN stat_inst_id SET DEFAULT nextval('public.stat_insts_stat_inst_id_seq'::regclass);
 F   ALTER TABLE public.stat_insts ALTER COLUMN stat_inst_id DROP DEFAULT;
       public       marabout    false    342    313            h           2604    83556    stat_months stat_month_id    DEFAULT     �   ALTER TABLE ONLY public.stat_months ALTER COLUMN stat_month_id SET DEFAULT nextval('public.stat_month_stat_month_id_seq'::regclass);
 H   ALTER TABLE public.stat_months ALTER COLUMN stat_month_id DROP DEFAULT;
       public       marabout    false    317    315            i           2604    83577    stat_weeks stat_week_id    DEFAULT     �   ALTER TABLE ONLY public.stat_weeks ALTER COLUMN stat_week_id SET DEFAULT nextval('public.stat_week_stat_week_id_seq'::regclass);
 F   ALTER TABLE public.stat_weeks ALTER COLUMN stat_week_id DROP DEFAULT;
       public       marabout    false    320    318            j           2604    83608    stat_years stat_year_id    DEFAULT     �   ALTER TABLE ONLY public.stat_years ALTER COLUMN stat_year_id SET DEFAULT nextval('public.stat_year_stat_year_id_seq'::regclass);
 F   ALTER TABLE public.stat_years ALTER COLUMN stat_year_id DROP DEFAULT;
       public       marabout    false    323    321            �           2604    74686    status_employees empstatus_id    DEFAULT     �   ALTER TABLE ONLY public.status_employees ALTER COLUMN empstatus_id SET DEFAULT nextval('public.status_employees_empstatus_id_seq'::regclass);
 L   ALTER TABLE public.status_employees ALTER COLUMN empstatus_id DROP DEFAULT;
       public       marabout    false    234    233    234            �           2604    140343 -   status_machine_lights status_machine_light_id    DEFAULT     �   ALTER TABLE ONLY public.status_machine_lights ALTER COLUMN status_machine_light_id SET DEFAULT nextval('public.status_machine_lights_status_machine_light_id_seq'::regclass);
 \   ALTER TABLE public.status_machine_lights ALTER COLUMN status_machine_light_id DROP DEFAULT;
       public       marabout    false    375    370            �           2604    74724    status_machines sm_id    DEFAULT     ~   ALTER TABLE ONLY public.status_machines ALTER COLUMN sm_id SET DEFAULT nextval('public.status_machines_sm_id_seq'::regclass);
 D   ALTER TABLE public.status_machines ALTER COLUMN sm_id DROP DEFAULT;
       public       marabout    false    235    236    236            �           2604    164853 )   status_maintenances status_maintenance_id    DEFAULT     �   ALTER TABLE ONLY public.status_maintenances ALTER COLUMN status_maintenance_id SET DEFAULT nextval('public.status_maintenances_status_maintenance_id_seq'::regclass);
 X   ALTER TABLE public.status_maintenances ALTER COLUMN status_maintenance_id DROP DEFAULT;
       public       marabout    false    406    384            |           2604    164788    status_tickets id    DEFAULT     v   ALTER TABLE ONLY public.status_tickets ALTER COLUMN id SET DEFAULT nextval('public.status_tickets_id_seq'::regclass);
 @   ALTER TABLE public.status_tickets ALTER COLUMN id DROP DEFAULT;
       public       marabout    false    402    365            �           2604    74884    status_users user_statusid    DEFAULT     �   ALTER TABLE ONLY public.status_users ALTER COLUMN user_statusid SET DEFAULT nextval('public.status_users_user_statusid_seq'::regclass);
 I   ALTER TABLE public.status_users ALTER COLUMN user_statusid DROP DEFAULT;
       public       marabout    false    244    228            �           2604    74867    terminal_types Tt_id    DEFAULT     �   ALTER TABLE ONLY public.terminal_types ALTER COLUMN "Tt_id" SET DEFAULT nextval('public."terminal_types_Tt_id_seq"'::regclass);
 E   ALTER TABLE public.terminal_types ALTER COLUMN "Tt_id" DROP DEFAULT;
       public       marabout    false    243    226            �           2604    74856    terminals Terminal_id    DEFAULT     �   ALTER TABLE ONLY public.terminals ALTER COLUMN "Terminal_id" SET DEFAULT nextval('public."terminals_Terminal_id_seq"'::regclass);
 F   ALTER TABLE public.terminals ALTER COLUMN "Terminal_id" DROP DEFAULT;
       public       marabout    false    242    225            ~           2604    164720    ticket_feed_attachments id    DEFAULT     �   ALTER TABLE ONLY public.ticket_feed_attachments ALTER COLUMN id SET DEFAULT nextval('public.ticket_feed_attachments_id_seq'::regclass);
 I   ALTER TABLE public.ticket_feed_attachments ALTER COLUMN id DROP DEFAULT;
       public       marabout    false    398    367            }           2604    164731    ticket_feeds ticket_feed_id    DEFAULT     �   ALTER TABLE ONLY public.ticket_feeds ALTER COLUMN ticket_feed_id SET DEFAULT nextval('public.ticket_feeds_ticket_feed_id_seq'::regclass);
 J   ALTER TABLE public.ticket_feeds ALTER COLUMN ticket_feed_id DROP DEFAULT;
       public       marabout    false    399    366            {           2604    164747    ticket_structures id    DEFAULT     |   ALTER TABLE ONLY public.ticket_structures ALTER COLUMN id SET DEFAULT nextval('public.ticket_structures_id_seq'::regclass);
 C   ALTER TABLE public.ticket_structures ALTER COLUMN id DROP DEFAULT;
       public       marabout    false    400    364            �           2604    24811 
   tickets id    DEFAULT     h   ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);
 9   ALTER TABLE public.tickets ALTER COLUMN id DROP DEFAULT;
       public       marabout    false    203    202    203            k           2604    83628 )   token_api_listeners token_api_listener_id    DEFAULT     �   ALTER TABLE ONLY public.token_api_listeners ALTER COLUMN token_api_listener_id SET DEFAULT nextval('public.token_api_listener_token_api_listener_id_seq'::regclass);
 X   ALTER TABLE public.token_api_listeners ALTER COLUMN token_api_listener_id DROP DEFAULT;
       public       marabout    false    326    324            �           2604    74590    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public       marabout    false    230    229            o           2604    83648    usersessions usersession_id    DEFAULT     �   ALTER TABLE ONLY public.usersessions ALTER COLUMN usersession_id SET DEFAULT nextval('public.usersession_usersession_id_seq'::regclass);
 J   ALTER TABLE public.usersessions ALTER COLUMN usersession_id DROP DEFAULT;
       public       marabout    false    329    327            p           2604    83664    workfiles workfiles_id    DEFAULT     �   ALTER TABLE ONLY public.workfiles ALTER COLUMN workfiles_id SET DEFAULT nextval('public.workfiles_workfiles_id_seq'::regclass);
 E   ALTER TABLE public.workfiles ALTER COLUMN workfiles_id DROP DEFAULT;
       public       marabout    false    331    330            �          0    75223    SequelizeMeta 
   TABLE DATA               /   COPY public."SequelizeMeta" (name) FROM stdin;
    public       marabout    false    249   7�      
          0    123787    article_operation_templates 
   TABLE DATA                  COPY public.article_operation_templates (article_operation_template_id, article_id, operation_template_id, active) FROM stdin;
    public       marabout    false    356   H       �          0    83094    articles 
   TABLE DATA               P   COPY public.articles (code, label, description, article_id, active) FROM stdin;
    public       marabout    false    265   z       �          0    66309 	   box_types 
   TABLE DATA               L   COPY public.box_types (bt_id, bt_label, bt_description, active) FROM stdin;
    public       marabout    false    227   \      �          0    66252    boxes 
   TABLE DATA               Z  COPY public.boxes (box_id, box_label, box_macaddress, current_versionid, box_description, enabled, machine_id, break_status, break_statusblue, manufacturingdate, updated_at, app_versionstatus, next_versionid, deploymentdate, site_id, line_id, repair_status, bt_id, gw_id, box_uptime, box_access_point, box_configuration_file, active) FROM stdin;
    public       marabout    false    222   �                0    123723    break_type_categories 
   TABLE DATA               c   COPY public.break_type_categories (category_id, category_label, active, category_code) FROM stdin;
    public       marabout    false    352   B      �          0    83139    break_types 
   TABLE DATA               r   COPY public.break_types (label_break, num_break, break_type_id, active, category_id, need_validation) FROM stdin;
    public       marabout    false    270   r      �          0    83115    breaks 
   TABLE DATA               q   COPY public.breaks (breaktype_id, break_id, active, usersession_id, start_time, end_time, push_time) FROM stdin;
    public       marabout    false    267   �      �          0    83185    bundle_carts 
   TABLE DATA               h   COPY public.bundle_carts (bundle_id, cart_id, affected_at, nbcarts, bundle_cart_id, active) FROM stdin;
    public       marabout    false    275   f      �          0    83146    bundles 
   TABLE DATA               T  COPY public.bundles (operation_groupe_id, code_bundle, num_bundle, variant1, variant2, variant3, size1, size2, cuo_id, cuo_pos, expr1, zu_tc_man3, zu_tc_man2, zu_tc_man4, zu_tc_man5, zu_tc_man6, bd_refid, bundle_qte, card_pcs, created_at, updated_at, tag, pushed_to_printer, bundle_id, printer_id, active, header_ref, order_id) FROM stdin;
    public       marabout    false    272   �      �          0    83207    cart_pending_operations 
   TABLE DATA               �   COPY public.cart_pending_operations (operation_id, bundle_id, finished, stitch_count, thread_cuts, "time", quantity, machine_id, datereadbundle, cart_pending_operation_id, active, datestart, dateend) FROM stdin;
    public       marabout    false    279   e      �          0    83249    cart_pending_sessions 
   TABLE DATA               3  COPY public.cart_pending_sessions (session_id, status, stitch_count, thread_cuts, quantity, cart_pendingoperation_id, created_at, updated_at, break_id, time_break_blue, cart_pending_session_id, active, "time", starttime, endtime, system_quantity, work_quality, started_at, start_time, end_time) FROM stdin;
    public       marabout    false    284   �      �          0    83272    cart_reopened_operations 
   TABLE DATA               �   COPY public.cart_reopened_operations (user_id, bundle_id, cart_id, operation_id, box_id, status, finished, stitch_count, thread_cuts, "time", quantity, datestart, dateend, cart_reopened_operation_id, active) FROM stdin;
    public       marabout    false    287   6      �          0    83192    carts 
   TABLE DATA               s   COPY public.carts (rfid_cart, filename, message, created_at, updated_at, print_start, cart_id, active) FROM stdin;
    public       marabout    false    277   S      �          0    57362    client_user 
   TABLE DATA               E   COPY public.client_user (id, client_id, user_id, active) FROM stdin;
    public       marabout    false    220   �      k          0    24669    clients 
   TABLE DATA               �   COPY public.clients (client_id, client_label, client_address, client_phonenumber, client_email, client_technicalcontact, client_salescontact, client_fax, client_picpath, client_city, country_id, active) FROM stdin;
    public       marabout    false    197   �                0    40975 	   countries 
   TABLE DATA               S   COPY public.countries (country_id, country_name, country_code, active) FROM stdin;
    public       marabout    false    217   �      �          0    74898    efiles 
   TABLE DATA               �   COPY public.efiles (file_id, file_name, original_name, file_title, active, uri, file_extension, file_type, file_size, doc_type, picture, created_at, updated_at) FROM stdin;
    public       marabout    false    246   �      w          0    32911 	   employees 
   TABLE DATA                 COPY public.employees (emp_id, emp_name, emp_lastname, emp_gender, emp_start_working_date, emp_address, emp_city, job_id, emp_age, emp_rfid, emp_lastlogindate, emp_email, group_id, empstatus_id, profile_image_id, active, emp_matricule, skill_id) FROM stdin;
    public       marabout    false    209   gN      }          0    33452    erp_sections 
   TABLE DATA               S   COPY public.erp_sections (esec_id, esec_label, esec_userlevel, active) FROM stdin;
    public       marabout    false    215   �V      �          0    82811    events 
   TABLE DATA               7   COPY public.events (event_id, event_label) FROM stdin;
    public       marabout    false    254   'W      �          0    83037 	   events_ms 
   TABLE DATA               B   COPY public.events_ms (events_ms_id, events_ms_label) FROM stdin;
    public       marabout    false    264   xW      �          0    82997 
   events_ops 
   TABLE DATA               A   COPY public.events_ops (id_event_op, event_op_label) FROM stdin;
    public       marabout    false    260   �W      �          0    66269    gateway_types 
   TABLE DATA               B   COPY public.gateway_types (gwt_id, gwt_label, active) FROM stdin;
    public       marabout    false    224   �W      �          0    66261    gateways 
   TABLE DATA               �   COPY public.gateways (gw_label, gw_address_mac_in_bound, gw_address_mac_out_bound, gw_description, gw_ip, gw_deployment_date, site_id, gwt_id, gw_id, configuration_file_id, active) FROM stdin;
    public       marabout    false    223   X      �          0    83295    gpdworks 
   TABLE DATA               �   COPY public.gpdworks (orderid, ordercode, ordernr, modelid, modelcode, opid, opcode, lopname, machtypeid, machtypecode, quantity, sam, opgroup, gpdwork_id, active) FROM stdin;
    public       marabout    false    290   �X      o          0    24719    groups 
   TABLE DATA               [   COPY public.groups (group_id, group_label, site_id, group_description, active) FROM stdin;
    public       marabout    false    201   �X      �          0    75268    has_permissions 
   TABLE DATA               x   COPY public.has_permissions (has_permissions_profild_id, has_permissions_permission_id, has_permissions_id) FROM stdin;
    public       marabout    false    250   �X      �          0    83324    import_logs 
   TABLE DATA               �   COPY public.import_logs (article, ordre, bundle, status_import, date_start, date_end, status_print, nb_carts, bundle_imp, codebundle, import_log_id, active) FROM stdin;
    public       marabout    false    292   �Y      u          0    32884    jobs 
   TABLE DATA               I   COPY public.jobs (job_id, job_name, job_description, active) FROM stdin;
    public       marabout    false    207   @Z      �          0    57348    lines 
   TABLE DATA               W   COPY public.lines (line_id, line_label, site_id, active, line_description) FROM stdin;
    public       marabout    false    219   �Z      �          0    82800    machine_events 
   TABLE DATA               �   COPY public.machine_events (machine_evt_id, date_time_event_start, event_type, event_id, cause, machine_id, date_time_event_end, description, active) FROM stdin;
    public       marabout    false    252   �Z      �          0    90976    machine_groups 
   TABLE DATA               X   COPY public.machine_groups (machine_group_id, machine_id, group_id, active) FROM stdin;
    public       marabout    false    344   `]                0    140289    machine_light_status_sessions 
   TABLE DATA               �   COPY public.machine_light_status_sessions (machine_light_status_session_id, light_status_id, start, "end", metas, active) FROM stdin;
    public       marabout    false    372   }]                0    123822    machine_session_operations 
   TABLE DATA               �   COPY public.machine_session_operations (machine_sess_op_id, stitchcount, quantity, time_in, time_out, user_op_session, machine_sess_id, machine_id) FROM stdin;
    public       marabout    false    360   �]                0    123808    machine_sessions 
   TABLE DATA               ]   COPY public.machine_sessions (machine_session_id, time_in, time_out, machine_id) FROM stdin;
    public       marabout    false    358   �]                0    99151    machine_types 
   TABLE DATA               �   COPY public.machine_types (machine_type_id, oil_change, general_revision, other_revision, machine_brand, type, code, model, active) FROM stdin;
    public       marabout    false    350   �]      s          0    32772    machines 
   TABLE DATA               W  COPY public.machines (machine_id, machine_label, machine_model, machine_startworkdate, machine_workingevt, machine_manufaclifetime, machine_productivity, machine_totalstitchcount, line_id, machine_totaluptime, sm_id, machine_totalworkinghours, active, group_id, machine_totaldowntime, rfid_cart, machine_type_id, machine_group_id) FROM stdin;
    public       marabout    false    205   �^                 0    140650    maintenance_feeds 
   TABLE DATA               �   COPY public.maintenance_feeds (duration, department_id, repared_by, feed_description, active, usersession_id, finished, maintenance_feed_id, maintenance_task_id, maintenance_template_id, status_maintenance_id, started_at, finished_at) FROM stdin;
    public       marabout    false    385   J_                0    140634    maintenance_tasks 
   TABLE DATA               �   COPY public.maintenance_tasks (created_at, machine_id, department_id, bug_description, owner_id, active, created_by, maintenance_task_id, maintenance_status_id, source, maintenance_template_id, repared_by, repared_at) FROM stdin;
    public       marabout    false    383   h`      "          0    140806    maintenance_templates 
   TABLE DATA               g   COPY public.maintenance_templates (label, active, departement_id, maintenance_template_id) FROM stdin;
    public       marabout    false    392   �a      �          0    83026    mechanic_events 
   TABLE DATA               �   COPY public.mechanic_events (mechanic_events_id, date_time_event_start, date_time_event_end, event_type, cause, machine_id, job_id, events_ms_id, employee_id, description) FROM stdin;
    public       marabout    false    262   �a                0    140532    notification_reads 
   TABLE DATA               y   COPY public.notification_reads (employee_id, read, date_read, active, notification_read_id, notification_id) FROM stdin;
    public       marabout    false    378   �a                0    140489    notifications 
   TABLE DATA               �   COPY public.notifications (message, created_at, created_by, employee_id, box_id, machine_id, bundle_id, operation_id, line_id, active, notification_id) FROM stdin;
    public       marabout    false    377   :b                0    140323    observations 
   TABLE DATA               ]   COPY public.observations (label, created_at, created_by, active, observation_id) FROM stdin;
    public       marabout    false    374   �b      �          0    83368    operation_groupes 
   TABLE DATA               f   COPY public.operation_groupes (label, description, active, operation_groupe_id, order_id) FROM stdin;
    public       marabout    false    296   d                0    123766    operation_templates 
   TABLE DATA               �   COPY public.operation_templates (operation_template_id, label, op_code, description, machine_type_id, active, "time", "accMinPrice", with_subsequence) FROM stdin;
    public       marabout    false    354   #d      �          0    83353 
   operations 
   TABLE DATA               �   COPY public.operations (machine_groupe_id, machine_type_id, label, op_code, description, "time", accminprice, operation_id, active, bundle_id, line_id, quantity) FROM stdin;
    public       marabout    false    294   ye      �          0    82986    operator_events 
   TABLE DATA               �   COPY public.operator_events (id_op_event, date_time_event_start, date_time_event_end, event_type, cause, description, event_op_id, machine_id, job_id, employee_id) FROM stdin;
    public       marabout    false    258   gf      �          0    83384    operatorproductivitys 
   TABLE DATA               �   COPY public.operatorproductivitys (accordproductivity, excesscost, globalproductivity, cumulwage, period, date, user_id, created_at, active, operatorproductivity_id) FROM stdin;
    public       marabout    false    298   �f      �          0    83404    orders 
   TABLE DATA               m   COPY public.orders (article_id, label, code, description, quantity, order_id, active, client_id) FROM stdin;
    public       marabout    false    300   �f      �          0    74848    permissions 
   TABLE DATA               N   COPY public.permissions (permission_id, permission_label, active) FROM stdin;
    public       marabout    false    241   �g      �          0    82845    printers 
   TABLE DATA               �   COPY public.printers (printer_id, printer_label, printer_ip, printer_description, printer_status, printer_deployed, printer_uptime, printer_configuration_file_id, printer_tag, active, port) FROM stdin;
    public       marabout    false    256   �h      !          0    140767 
   priorities 
   TABLE DATA               @   COPY public.priorities (label, active, id_priority) FROM stdin;
    public       marabout    false    391   Xi      �          0    74607    profiles 
   TABLE DATA               �   COPY public.profiles (profile_id, profile_label, profile_allowedsections, profile_description, active, has_update, has_delete, has_save) FROM stdin;
    public       marabout    false    232   �i      �          0    83422    reports 
   TABLE DATA               �   COPY public.reports (user_id, operation_id, box_id, bundle_id, cart_id, status, finished, stitch_count, thread_cuts, "time", quantity, datestart, dateend, report_id, active) FROM stdin;
    public       marabout    false    303   4j      �          0    83922    revision_events 
   TABLE DATA               �   COPY public.revision_events (id_revision, machine_id, date_time_event_start, event_type, event_id, date_time_event_end, updated_at, machine_evt_id) FROM stdin;
    public       marabout    false    339   Qj      �          0    75186    revision_machine 
   TABLE DATA               B  COPY public.revision_machine (revision_id, machine_id, machine_model, machine_startworkdate, machine_workingevt, machine_manufaclifetime, machine_productivity, machine_totalstitchcount, line_id, machine_totaluptime, sm_id, group_id, machine_totalworkinghours, machine_label, updated_at, machine_totaldowntime) FROM stdin;
    public       marabout    false    248   �q      �          0    83443    romboldtxts 
   TABLE DATA               (  COPY public.romboldtxts (header_ref, package_id, package_bc, model, variant1, variant2, variant3, size1, size2, quantity, customer_id, cuo_id, cuo_pos, expr1, zu_tc_man3, zu_tc_man2, zu_tc_man4, zu_tc_man5, zu_tc_man6, bd_refid, card_pcs, created_at, romboldtxt_id, order_id, active) FROM stdin;
    public       marabout    false    305   ��                0    140569    sequence_operations 
   TABLE DATA               [  COPY public.sequence_operations (stitchcount, coupe_fil, parent_sequence, back_stitch, sequence_order, picture_id, active, operation_template_id, back_stich_positive_tolerence, back_stich_negative_tolerence, stitchcount_positive_tolerence, stitchcount_negative_tolerence, sequence_id, operation_id, sequence_operation_id, description) FROM stdin;
    public       marabout    false    379   ڀ                0    140240 	   sequences 
   TABLE DATA               ?  COPY public.sequences (sequence_id, stitchcount, sequence_order, picture_id, active, coupe_fil, back_stitch, operation_template_id, parent_sequence, back_stich_positive_tolerence, back_stich_negative_tolerence, stitchcount_positive_tolerence, stitchcount_negative_tolerence, with_subsequences, description) FROM stdin;
    public       marabout    false    369   ˃      {          0    33430    servers 
   TABLE DATA               �   COPY public.servers (server_id, server_label, server_ip, server_description, server_status, server_deployed, server_uptime, active) FROM stdin;
    public       marabout    false    213   X�      m          0    24703    sites 
   TABLE DATA               �   COPY public.sites (site_id, site_label, site_email, site_phone, site_technicalcontact, site_prodcontact, site_fax, site_address, site_city, country_id, client_id, active) FROM stdin;
    public       marabout    false    199   ʅ                0    91047    skill_employees 
   TABLE DATA               V   COPY public.skill_employees (skill_employee_id, skill_id, active, emp_id) FROM stdin;
    public       marabout    false    348   h�                 0    91029    skills 
   TABLE DATA               R   COPY public.skills (skill_id, skill_label, skill_description, active) FROM stdin;
    public       marabout    false    346   ��      �          0    83485 	   stat_days 
   TABLE DATA               �   COPY public.stat_days (date_to, nbr_user_online, total_box, nb_box_break_cat1, nb_box_break_cat2, work_time, nbr_user_absent, nb_bundle_group, total_time_bundle, total_bundle, stat_day_id, active) FROM stdin;
    public       marabout    false    308   ц      �          0    83505 
   stat_hours 
   TABLE DATA               �   COPY public.stat_hours (date_to, nbr_user_online, total_box, nb_box_break_cat1, nb_box_break_cat2, work_time, nbr_user_absent, nb_bundle_group, total_time_bundle, total_bundle, nbr_box_online, stat_hour_id, active) FROM stdin;
    public       marabout    false    310   �      �          0    83525 
   stat_insts 
   TABLE DATA               �   COPY public.stat_insts (date_to, nbr_user_online, total_box, nb_box_break_cat1, nb_box_break_cat2, work_time, nbr_user_absent, nb_bundle_group, total_time_bundle, total_bundle, nbr_box_online, stat_inst_id, active) FROM stdin;
    public       marabout    false    313   u�      �          0    83545    stat_months 
   TABLE DATA               �   COPY public.stat_months (date_to, nbr_user_online, total_box, nb_box_break_cat1, nb_box_break_cat2, work_time, nbr_user_absent, nb_bundle_group, total_time_bundle, total_bundle, nbr_box_online, stat_month_id, active) FROM stdin;
    public       marabout    false    315   ��      �          0    83566 
   stat_weeks 
   TABLE DATA               �   COPY public.stat_weeks (date_to, nbr_user_online, total_box, nb_box_break_cat1, nb_box_break_cat2, work_time, nbr_user_absent, nb_bundle_group, total_time_bundle, total_bundle, nbr_box_online, stat_week_id, active) FROM stdin;
    public       marabout    false    318   �      �          0    83586 
   stat_years 
   TABLE DATA               �   COPY public.stat_years (date_to, nbr_user_online, total_box, nb_box_break_cat1, nb_box_break_cat2, work_time, nbr_user_absent, nb_bundle_group, total_time_bundle, total_bundle, nbr_box_online, stat_year_id, active) FROM stdin;
    public       marabout    false    321   J�      �          0    74683    status_employees 
   TABLE DATA               Q   COPY public.status_employees (empstatus_id, empstatus_label, active) FROM stdin;
    public       marabout    false    234   ��                0    140258    status_machine_lights 
   TABLE DATA               \   COPY public.status_machine_lights (label, code, metas, status_machine_light_id) FROM stdin;
    public       marabout    false    370   ψ      �          0    74721    status_machines 
   TABLE DATA               R   COPY public.status_machines (sm_id, sm_label, sm_description, active) FROM stdin;
    public       marabout    false    236   �                0    140642    status_maintenances 
   TABLE DATA               Y   COPY public.status_maintenances (label, code, active, status_maintenance_id) FROM stdin;
    public       marabout    false    384   .�                0    140183    status_tickets 
   TABLE DATA               A   COPY public.status_tickets (label, code, active, id) FROM stdin;
    public       marabout    false    365   ��      �          0    66844    status_users 
   TABLE DATA               G   COPY public.status_users (user_statuslabel, user_statusid) FROM stdin;
    public       marabout    false    228   ��      �          0    66303    terminal_types 
   TABLE DATA               W   COPY public.terminal_types ("Tt_label", "Tt_description", "Tt_id", active) FROM stdin;
    public       marabout    false    226   5�      �          0    66295 	   terminals 
   TABLE DATA               �   COPY public.terminals ("Terminal_label", "Terminal_ip", "Terminal_description", "Terminal_id", "Tt_id", "Terminal_deployment_date", "Terminal_status", "Terminal_uptime", "Terminal_configuration_file_id", active) FROM stdin;
    public       marabout    false    225   r�                0    140211    ticket_feed_attachments 
   TABLE DATA               b   COPY public.ticket_feed_attachments (file_id, created_at, active, id, ticket_feed_id) FROM stdin;
    public       marabout    false    367   ��                0    140194    ticket_feeds 
   TABLE DATA               �   COPY public.ticket_feeds (comment, created_at, active, department_id, owner_id, created_by, image_id, ticket_feed_id, ticket_id, status_id) FROM stdin;
    public       marabout    false    366   0�                0    140157    ticket_structures 
   TABLE DATA               �   COPY public.ticket_structures (subject, line_id, department_id, created_at, owner_id, active, operation_id, created_by, bundle_id, order_id, box_id, source, image_id, id, observation_id, current_status_id, id_priority) FROM stdin;
    public       marabout    false    364   �      q          0    24808    tickets 
   TABLE DATA               ^   COPY public.tickets (id, subject, description, priority, status, user_id, active) FROM stdin;
    public       marabout    false    203   �      �          0    83617    token_api_listeners 
   TABLE DATA               �   COPY public.token_api_listeners (token, response, requestdata, date_created, retries, token_api_listener_id, active) FROM stdin;
    public       marabout    false    324   �      �          0    74581    users 
   TABLE DATA               �   COPY public.users (user_name, user_passwordhash, user_familyname, user_email, user_address, user_city, user_status, group_id, profile_id, reset_password_token, active_account_token, client_id, user_id, active, rfid, name, user_phonenumber) FROM stdin;
    public       marabout    false    229   +�      �          0    83637    usersessions 
   TABLE DATA               �   COPY public.usersessions (box_id, last_tag, time_in, time_out, cart_id, logout_tag, op_offset, usersession_id, active, usersession_export, employee_id) FROM stdin;
    public       marabout    false    327   ��      �          0    83658 	   workfiles 
   TABLE DATA               c   COPY public.workfiles (wfid, duration, type, workfiles_id, active, datestart, dateend) FROM stdin;
    public       marabout    false    330   ��      �           0    0      import_logs_import_log_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."  import_logs_import_log_id_seq"', 3, true);
            public       marabout    false    334            �           0    0    Boxes1_Box_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Boxes1_Box_id_seq"', 3, true);
            public       marabout    false    221            �           0    0    article_article_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.article_article_id_seq', 20, true);
            public       marabout    false    332            �           0    0 =   article_operation_templates_article_operation_template_id_seq    SEQUENCE SET     l   SELECT pg_catalog.setval('public.article_operation_templates_article_operation_template_id_seq', 17, true);
            public       marabout    false    355            �           0    0    box_types_bt_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.box_types_bt_id_seq', 4, true);
            public       marabout    false    238            �           0    0    break_break_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.break_break_id_seq', 150, true);
            public       marabout    false    269            �           0    0    break_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.break_id_seq', 1, false);
            public       marabout    false    266            �           0    0    break_type_break_type_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.break_type_break_type_id_seq', 7, true);
            public       marabout    false    333            �           0    0 %   break_type_categories_category_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.break_type_categories_category_id_seq', 3, true);
            public       marabout    false    351            �           0    0    break_type_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.break_type_id_seq', 1, false);
            public       marabout    false    268            �           0    0    bundle_bundle_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.bundle_bundle_id_seq', 54, true);
            public       marabout    false    274            �           0    0    bundle_cart_bundle_cart_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.bundle_cart_bundle_cart_id_seq', 10, true);
            public       marabout    false    281            �           0    0    bundle_cart_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.bundle_cart_id_seq', 1, false);
            public       marabout    false    273            �           0    0    bundle_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.bundle_id_seq', 1, false);
            public       marabout    false    271            �           0    0    cart_cart_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.cart_cart_id_seq', 14, true);
            public       marabout    false    282            �           0    0    cart_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.cart_id_seq', 1, false);
            public       marabout    false    276            �           0    0 4   cart_pending_operation_cart_pending_operation_id_seq    SEQUENCE SET     b   SELECT pg_catalog.setval('public.cart_pending_operation_cart_pending_operation_id_seq', 9, true);
            public       marabout    false    283            �           0    0    cart_pending_operation_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.cart_pending_operation_id_seq', 1, false);
            public       marabout    false    278            �           0    0 0   cart_pending_session_cart_pending_session_id_seq    SEQUENCE SET     `   SELECT pg_catalog.setval('public.cart_pending_session_cart_pending_session_id_seq', 204, true);
            public       marabout    false    286            �           0    0    cart_pending_session_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.cart_pending_session_id_seq', 1, false);
            public       marabout    false    280            �           0    0 6   cart_reopened_operation_cart_reopened_operation_id_seq    SEQUENCE SET     e   SELECT pg_catalog.setval('public.cart_reopened_operation_cart_reopened_operation_id_seq', 1, false);
            public       marabout    false    289            �           0    0    cart_reopened_operation_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.cart_reopened_operation_id_seq', 1, false);
            public       marabout    false    285            �           0    0    chains_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.chains_id_seq', 2, true);
            public       marabout    false    218            �           0    0    clients_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.clients_id_seq', 58, true);
            public       marabout    false    196            �           0    0    countries_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.countries_id_seq', 248, true);
            public       marabout    false    216            �           0    0    efile_file_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.efile_file_id_seq', 656, true);
            public       marabout    false    245            �           0    0    employees_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.employees_id_seq', 77, true);
            public       marabout    false    208            �           0    0    employees_task_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.employees_task_id_seq', 1, false);
            public       marabout    false    210            �           0    0    events_event_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.events_event_id_seq', 1, false);
            public       marabout    false    253            �           0    0    events_ms_events_ms_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.events_ms_events_ms_id_seq', 1, false);
            public       marabout    false    263            �           0    0    events_ops_id_event_op_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.events_ops_id_event_op_seq', 1, false);
            public       marabout    false    259            �           0    0    gateway_types_gwt_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.gateway_types_gwt_id_seq', 6, true);
            public       marabout    false    237            �           0    0    gateways_gw_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.gateways_gw_id_seq', 2, true);
            public       marabout    false    239            �           0    0    gpdwork_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.gpdwork_id_seq', 1, false);
            public       marabout    false    288            �           0    0    gpdworks_gpdwork_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.gpdworks_gpdwork_id_seq', 1, false);
            public       marabout    false    336            �           0    0    groups_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.groups_id_seq', 1, false);
            public       marabout    false    200            �           0    0    groups_site_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.groups_site_id_seq', 1, false);
            public       marabout    false    211            �           0    0    has_permissions_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.has_permissions_id_seq', 83, true);
            public       marabout    false    408            �           0    0    import_log_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.import_log_id_seq', 1, false);
            public       marabout    false    291            �           0    0 !   machine_events_machine_evt_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.machine_events_machine_evt_id_seq', 48, true);
            public       marabout    false    251            �           0    0 #   machine_groups_machine_group_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.machine_groups_machine_group_id_seq', 1, false);
            public       marabout    false    343            �           0    0 ?   machine_light_status_sessions_machine_light_status_session__seq    SEQUENCE SET     m   SELECT pg_catalog.setval('public.machine_light_status_sessions_machine_light_status_session__seq', 1, true);
            public       marabout    false    371            �           0    0 1   machine_session_operations_machine_sess_op_id_seq    SEQUENCE SET     `   SELECT pg_catalog.setval('public.machine_session_operations_machine_sess_op_id_seq', 1, false);
            public       marabout    false    359            �           0    0 '   machine_sessions_machine_session_id_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.machine_sessions_machine_session_id_seq', 1, false);
            public       marabout    false    357            �           0    0 !   machine_types_machine_type_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.machine_types_machine_type_id_seq', 9, true);
            public       marabout    false    349            �           0    0    machines_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.machines_id_seq', 5, true);
            public       marabout    false    204            �           0    0 )   maintenance_feeds_maintenance_feed_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public.maintenance_feeds_maintenance_feed_id_seq', 163, true);
            public       marabout    false    403            �           0    0 )   maintenance_tasks_maintenance_task_id_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('public.maintenance_tasks_maintenance_task_id_seq', 56, true);
            public       marabout    false    404            �           0    0 1   maintenance_templates_maintenance_template_id_seq    SEQUENCE SET     _   SELECT pg_catalog.setval('public.maintenance_templates_maintenance_template_id_seq', 7, true);
            public       marabout    false    405            �           0    0 &   mechanic_events_mechanic_events_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public.mechanic_events_mechanic_events_id_seq', 1, false);
            public       marabout    false    261            �           0    0    menus_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.menus_id_seq', 11, true);
            public       marabout    false    214            �           0    0 +   notification_reads_notification_read_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public.notification_reads_notification_read_id_seq', 9, true);
            public       marabout    false    396            �           0    0 !   notifications_notification_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.notifications_notification_id_seq', 10, true);
            public       marabout    false    397            �           0    0    observations_observation_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.observations_observation_id_seq', 66, true);
            public       marabout    false    401            �           0    0    operation_groupe_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.operation_groupe_id_seq', 1, false);
            public       marabout    false    295            �           0    0 )   operation_groupes_operation_groupe_id_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('public.operation_groupes_operation_groupe_id_seq', 1, false);
            public       marabout    false    337            �           0    0    operation_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.operation_id_seq', 1, false);
            public       marabout    false    293            �           0    0 -   operation_templates_operation_template_id_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public.operation_templates_operation_template_id_seq', 38, true);
            public       marabout    false    353            �           0    0    operations_operation_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.operations_operation_id_seq', 59, true);
            public       marabout    false    335            �           0    0    operator_events_id_op_event_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.operator_events_id_op_event_seq', 1, false);
            public       marabout    false    257            �           0    0    operatorproductivity_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.operatorproductivity_id_seq', 1, false);
            public       marabout    false    297            �           0    0 1   operatorproductivitys_operatorproductivity_id_seq    SEQUENCE SET     `   SELECT pg_catalog.setval('public.operatorproductivitys_operatorproductivity_id_seq', 1, false);
            public       marabout    false    340            �           0    0    ordre_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.ordre_id_seq', 1, false);
            public       marabout    false    299            �           0    0    ordre_ordre_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.ordre_ordre_id_seq', 40, true);
            public       marabout    false    302            �           0    0    permissions_permission_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.permissions_permission_id_seq', 19, true);
            public       marabout    false    240            �           0    0    printers_printer_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.printers_printer_id_seq', 7, true);
            public       marabout    false    255            �           0    0    priorities_id_priority_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.priorities_id_priority_seq', 5, true);
            public       marabout    false    407            �           0    0    profiles_profile_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.profiles_profile_id_seq', 78, true);
            public       marabout    false    231            �           0    0    report_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.report_id_seq', 1, false);
            public       marabout    false    301            �           0    0    report_report_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.report_report_id_seq', 1, false);
            public       marabout    false    304            �           0    0    revision_events_id_revision_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.revision_events_id_revision_seq', 105, true);
            public       marabout    false    338            �           0    0     revision_machine_revision_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.revision_machine_revision_id_seq', 244, true);
            public       marabout    false    247            �           0    0    romboldtxt_romboldtxt_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.romboldtxt_romboldtxt_id_seq', 1, false);
            public       marabout    false    307            �           0    0 -   sequence_operations_sequence_operation_id_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public.sequence_operations_sequence_operation_id_seq', 671, true);
            public       marabout    false    380            �           0    0    sequences_sequence_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.sequences_sequence_id_seq', 89, true);
            public       marabout    false    368            �           0    0    servers_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.servers_id_seq', 12, true);
            public       marabout    false    212            �           0    0    sites_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.sites_id_seq', 2, true);
            public       marabout    false    198            �           0    0 %   skill_employees_skill_employee_id_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.skill_employees_skill_employee_id_seq', 4, true);
            public       marabout    false    347            �           0    0    skills_skill_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.skills_skill_id_seq', 15, true);
            public       marabout    false    345            �           0    0    stat_day_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.stat_day_id_seq', 1, false);
            public       marabout    false    306            �           0    0    stat_days_stat_day_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.stat_days_stat_day_id_seq', 3, true);
            public       marabout    false    341            �           0    0    stat_hour_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.stat_hour_id_seq', 1, false);
            public       marabout    false    309            �           0    0    stat_hour_stat_hour_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.stat_hour_stat_hour_id_seq', 4, true);
            public       marabout    false    312            �           0    0    stat_inst_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.stat_inst_id_seq', 1, false);
            public       marabout    false    311            �           0    0    stat_insts_stat_inst_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.stat_insts_stat_inst_id_seq', 3, true);
            public       marabout    false    342            �           0    0    stat_month_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.stat_month_id_seq', 1, false);
            public       marabout    false    314            �           0    0    stat_month_stat_month_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.stat_month_stat_month_id_seq', 3, true);
            public       marabout    false    317            �           0    0    stat_week_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.stat_week_id_seq', 1, false);
            public       marabout    false    316            �           0    0    stat_week_stat_week_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.stat_week_stat_week_id_seq', 3, true);
            public       marabout    false    320            �           0    0    stat_year_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.stat_year_id_seq', 1, false);
            public       marabout    false    319            �           0    0    stat_year_stat_year_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.stat_year_stat_year_id_seq', 3, true);
            public       marabout    false    323            �           0    0 !   status_employees_empstatus_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.status_employees_empstatus_id_seq', 6, true);
            public       marabout    false    233            �           0    0 1   status_machine_lights_status_machine_light_id_seq    SEQUENCE SET     _   SELECT pg_catalog.setval('public.status_machine_lights_status_machine_light_id_seq', 1, true);
            public       marabout    false    375            �           0    0    status_machines_sm_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.status_machines_sm_id_seq', 1, false);
            public       marabout    false    235            �           0    0 -   status_maintenances_status_maintenance_id_seq    SEQUENCE SET     [   SELECT pg_catalog.setval('public.status_maintenances_status_maintenance_id_seq', 4, true);
            public       marabout    false    406            �           0    0    status_tickets_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.status_tickets_id_seq', 6, true);
            public       marabout    false    402            �           0    0    status_users_user_statusid_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.status_users_user_statusid_seq', 4, true);
            public       marabout    false    244            �           0    0    tasks_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tasks_id_seq', 6, true);
            public       marabout    false    206            �           0    0    terminal_types_Tt_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."terminal_types_Tt_id_seq"', 3, true);
            public       marabout    false    243            �           0    0    terminals_Terminal_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."terminals_Terminal_id_seq"', 6, true);
            public       marabout    false    242            �           0    0    ticket_feed_attachments_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.ticket_feed_attachments_id_seq', 122, true);
            public       marabout    false    398            �           0    0    ticket_feeds_ticket_feed_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.ticket_feeds_ticket_feed_id_seq', 86, true);
            public       marabout    false    399            �           0    0    ticket_structures_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.ticket_structures_id_seq', 31, true);
            public       marabout    false    400            �           0    0    tickets_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.tickets_id_seq', 6, true);
            public       marabout    false    202            �           0    0    token_api_listener_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.token_api_listener_id_seq', 1, false);
            public       marabout    false    322            �           0    0 ,   token_api_listener_token_api_listener_id_seq    SEQUENCE SET     Z   SELECT pg_catalog.setval('public.token_api_listener_token_api_listener_id_seq', 3, true);
            public       marabout    false    326            �           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 10, true);
            public       marabout    false    230            �           0    0    usersession_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.usersession_id_seq', 1, false);
            public       marabout    false    325            �           0    0    usersession_usersession_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.usersession_usersession_id_seq', 1001, true);
            public       marabout    false    329            �           0    0    workfiles_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.workfiles_id_seq', 1, false);
            public       marabout    false    328            �           0    0    workfiles_workfiles_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.workfiles_workfiles_id_seq', 3, true);
            public       marabout    false    331            �           2606    83741    import_logs   import_logs_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.import_logs
    ADD CONSTRAINT "  import_logs_pkey" PRIMARY KEY (import_log_id);
 J   ALTER TABLE ONLY public.import_logs DROP CONSTRAINT "  import_logs_pkey";
       public         marabout    false    292            �           2606    75227     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public         marabout    false    249                       2606    123792 <   article_operation_templates article_operation_templates_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.article_operation_templates
    ADD CONSTRAINT article_operation_templates_pkey PRIMARY KEY (article_operation_template_id);
 f   ALTER TABLE ONLY public.article_operation_templates DROP CONSTRAINT article_operation_templates_pkey;
       public         marabout    false    356            �           2606    83678    articles article_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.articles
    ADD CONSTRAINT article_pkey PRIMARY KEY (article_id);
 ?   ALTER TABLE ONLY public.articles DROP CONSTRAINT article_pkey;
       public         marabout    false    265            �           2606    74816    box_types box_types_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.box_types
    ADD CONSTRAINT box_types_pkey PRIMARY KEY (bt_id);
 B   ALTER TABLE ONLY public.box_types DROP CONSTRAINT box_types_pkey;
       public         marabout    false    227            �           2606    66260    boxes boxes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.boxes
    ADD CONSTRAINT boxes_pkey PRIMARY KEY (box_id);
 :   ALTER TABLE ONLY public.boxes DROP CONSTRAINT boxes_pkey;
       public         marabout    false    222            �           2606    83138    breaks break_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.breaks
    ADD CONSTRAINT break_pkey PRIMARY KEY (break_id);
 ;   ALTER TABLE ONLY public.breaks DROP CONSTRAINT break_pkey;
       public         marabout    false    267                       2606    123731 0   break_type_categories break_type_categories_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public.break_type_categories
    ADD CONSTRAINT break_type_categories_pkey PRIMARY KEY (category_id);
 Z   ALTER TABLE ONLY public.break_type_categories DROP CONSTRAINT break_type_categories_pkey;
       public         marabout    false    352            �           2606    83713    break_types break_type_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.break_types
    ADD CONSTRAINT break_type_pkey PRIMARY KEY (break_type_id);
 E   ALTER TABLE ONLY public.break_types DROP CONSTRAINT break_type_pkey;
       public         marabout    false    270            �           2606    83225    bundle_carts bundle_cart_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.bundle_carts
    ADD CONSTRAINT bundle_cart_pkey PRIMARY KEY (bundle_cart_id);
 G   ALTER TABLE ONLY public.bundle_carts DROP CONSTRAINT bundle_cart_pkey;
       public         marabout    false    275            �           2606    83184    bundles bundle_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.bundles
    ADD CONSTRAINT bundle_pkey PRIMARY KEY (bundle_id);
 =   ALTER TABLE ONLY public.bundles DROP CONSTRAINT bundle_pkey;
       public         marabout    false    272            �           2606    83247 3   cart_pending_operations cart_pending_operation_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.cart_pending_operations
    ADD CONSTRAINT cart_pending_operation_pkey PRIMARY KEY (cart_pending_operation_id);
 ]   ALTER TABLE ONLY public.cart_pending_operations DROP CONSTRAINT cart_pending_operation_pkey;
       public         marabout    false    279            �           2606    83271 /   cart_pending_sessions cart_pending_session_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.cart_pending_sessions
    ADD CONSTRAINT cart_pending_session_pkey PRIMARY KEY (cart_pending_session_id);
 Y   ALTER TABLE ONLY public.cart_pending_sessions DROP CONSTRAINT cart_pending_session_pkey;
       public         marabout    false    284            �           2606    83236    carts cart_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT cart_pkey PRIMARY KEY (cart_id);
 9   ALTER TABLE ONLY public.carts DROP CONSTRAINT cart_pkey;
       public         marabout    false    277            �           2606    83294 5   cart_reopened_operations cart_reopened_operation_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.cart_reopened_operations
    ADD CONSTRAINT cart_reopened_operation_pkey PRIMARY KEY (cart_reopened_operation_id);
 _   ALTER TABLE ONLY public.cart_reopened_operations DROP CONSTRAINT cart_reopened_operation_pkey;
       public         marabout    false    287            �           2606    57356    lines chains_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.lines
    ADD CONSTRAINT chains_pkey PRIMARY KEY (line_id);
 ;   ALTER TABLE ONLY public.lines DROP CONSTRAINT chains_pkey;
       public         marabout    false    219            �           2606    24677    clients clients_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (client_id);
 >   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_pkey;
       public         marabout    false    197            �           2606    40983    countries countries_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (country_id);
 B   ALTER TABLE ONLY public.countries DROP CONSTRAINT countries_pkey;
       public         marabout    false    217            �           2606    74906    efiles efile_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.efiles
    ADD CONSTRAINT efile_pkey PRIMARY KEY (file_id);
 ;   ALTER TABLE ONLY public.efiles DROP CONSTRAINT efile_pkey;
       public         marabout    false    246            �           2606    32919    employees employees_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (emp_id);
 B   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_pkey;
       public         marabout    false    209            �           2606    83045    events_ms events_ms_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.events_ms
    ADD CONSTRAINT events_ms_pkey PRIMARY KEY (events_ms_id);
 B   ALTER TABLE ONLY public.events_ms DROP CONSTRAINT events_ms_pkey;
       public         marabout    false    264            �           2606    83005    events_ops events_ops_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.events_ops
    ADD CONSTRAINT events_ops_pkey PRIMARY KEY (id_event_op);
 D   ALTER TABLE ONLY public.events_ops DROP CONSTRAINT events_ops_pkey;
       public         marabout    false    260            �           2606    82819    events events_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);
 <   ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
       public         marabout    false    254            �           2606    74755     gateway_types gateway_types_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.gateway_types
    ADD CONSTRAINT gateway_types_pkey PRIMARY KEY (gwt_id);
 J   ALTER TABLE ONLY public.gateway_types DROP CONSTRAINT gateway_types_pkey;
       public         marabout    false    224            �           2606    74840    gateways gateways_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.gateways
    ADD CONSTRAINT gateways_pkey PRIMARY KEY (gw_id);
 @   ALTER TABLE ONLY public.gateways DROP CONSTRAINT gateways_pkey;
       public         marabout    false    223            �           2606    83839    gpdworks gpdworks_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.gpdworks
    ADD CONSTRAINT gpdworks_pkey PRIMARY KEY (gpdwork_id);
 @   ALTER TABLE ONLY public.gpdworks DROP CONSTRAINT gpdworks_pkey;
       public         marabout    false    290            �           2606    24727    groups groups_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (group_id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public         marabout    false    201            �           2606    74829    client_user id 
   CONSTRAINT     L   ALTER TABLE ONLY public.client_user
    ADD CONSTRAINT id PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.client_user DROP CONSTRAINT id;
       public         marabout    false    220            �           2606    82808 "   machine_events machine_events_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.machine_events
    ADD CONSTRAINT machine_events_pkey PRIMARY KEY (machine_evt_id);
 L   ALTER TABLE ONLY public.machine_events DROP CONSTRAINT machine_events_pkey;
       public         marabout    false    252                       2606    90984 "   machine_groups machine_groups_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.machine_groups
    ADD CONSTRAINT machine_groups_pkey PRIMARY KEY (machine_group_id);
 L   ALTER TABLE ONLY public.machine_groups DROP CONSTRAINT machine_groups_pkey;
       public         marabout    false    344            3           2606    140297 @   machine_light_status_sessions machine_light_status_sessions_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.machine_light_status_sessions
    ADD CONSTRAINT machine_light_status_sessions_pkey PRIMARY KEY (machine_light_status_session_id);
 j   ALTER TABLE ONLY public.machine_light_status_sessions DROP CONSTRAINT machine_light_status_sessions_pkey;
       public         marabout    false    372            %           2606    123830 :   machine_session_operations machine_session_operations_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.machine_session_operations
    ADD CONSTRAINT machine_session_operations_pkey PRIMARY KEY (machine_sess_op_id);
 d   ALTER TABLE ONLY public.machine_session_operations DROP CONSTRAINT machine_session_operations_pkey;
       public         marabout    false    360            !           2606    123813 &   machine_sessions machine_sessions_pkey 
   CONSTRAINT     t   ALTER TABLE ONLY public.machine_sessions
    ADD CONSTRAINT machine_sessions_pkey PRIMARY KEY (machine_session_id);
 P   ALTER TABLE ONLY public.machine_sessions DROP CONSTRAINT machine_sessions_pkey;
       public         marabout    false    358                       2606    99159     machine_types machine_types_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.machine_types
    ADD CONSTRAINT machine_types_pkey PRIMARY KEY (machine_type_id);
 J   ALTER TABLE ONLY public.machine_types DROP CONSTRAINT machine_types_pkey;
       public         marabout    false    350            �           2606    32780    machines machines_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.machines
    ADD CONSTRAINT machines_pkey PRIMARY KEY (machine_id);
 @   ALTER TABLE ONLY public.machines DROP CONSTRAINT machines_pkey;
       public         marabout    false    205            A           2606    164817 (   maintenance_feeds maintenance_feeds_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public.maintenance_feeds
    ADD CONSTRAINT maintenance_feeds_pkey PRIMARY KEY (maintenance_feed_id);
 R   ALTER TABLE ONLY public.maintenance_feeds DROP CONSTRAINT maintenance_feeds_pkey;
       public         marabout    false    385            =           2606    164829 (   maintenance_tasks maintenance_tasks_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public.maintenance_tasks
    ADD CONSTRAINT maintenance_tasks_pkey PRIMARY KEY (maintenance_task_id);
 R   ALTER TABLE ONLY public.maintenance_tasks DROP CONSTRAINT maintenance_tasks_pkey;
       public         marabout    false    383            E           2606    164845 0   maintenance_templates maintenance_templates_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_templates
    ADD CONSTRAINT maintenance_templates_pkey PRIMARY KEY (maintenance_template_id);
 Z   ALTER TABLE ONLY public.maintenance_templates DROP CONSTRAINT maintenance_templates_pkey;
       public         marabout    false    392            �           2606    83034 $   mechanic_events mechanic_events_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.mechanic_events
    ADD CONSTRAINT mechanic_events_pkey PRIMARY KEY (mechanic_events_id);
 N   ALTER TABLE ONLY public.mechanic_events DROP CONSTRAINT mechanic_events_pkey;
       public         marabout    false    262            �           2606    33460    erp_sections menus_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.erp_sections
    ADD CONSTRAINT menus_pkey PRIMARY KEY (esec_id);
 A   ALTER TABLE ONLY public.erp_sections DROP CONSTRAINT menus_pkey;
       public         marabout    false    215            9           2606    164701 *   notification_reads notification_reads_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.notification_reads
    ADD CONSTRAINT notification_reads_pkey PRIMARY KEY (notification_read_id);
 T   ALTER TABLE ONLY public.notification_reads DROP CONSTRAINT notification_reads_pkey;
       public         marabout    false    378            7           2606    164712     notifications notifications_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);
 J   ALTER TABLE ONLY public.notifications DROP CONSTRAINT notifications_pkey;
       public         marabout    false    377            5           2606    164780    observations observations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.observations
    ADD CONSTRAINT observations_pkey PRIMARY KEY (observation_id);
 H   ALTER TABLE ONLY public.observations DROP CONSTRAINT observations_pkey;
       public         marabout    false    374            �           2606    83875 (   operation_groupes operation_groupes_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public.operation_groupes
    ADD CONSTRAINT operation_groupes_pkey PRIMARY KEY (operation_groupe_id);
 R   ALTER TABLE ONLY public.operation_groupes DROP CONSTRAINT operation_groupes_pkey;
       public         marabout    false    296                       2606    123774 ,   operation_templates operation_templates_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.operation_templates
    ADD CONSTRAINT operation_templates_pkey PRIMARY KEY (operation_template_id);
 V   ALTER TABLE ONLY public.operation_templates DROP CONSTRAINT operation_templates_pkey;
       public         marabout    false    354            �           2606    83755    operations operations_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.operations
    ADD CONSTRAINT operations_pkey PRIMARY KEY (operation_id);
 D   ALTER TABLE ONLY public.operations DROP CONSTRAINT operations_pkey;
       public         marabout    false    294            �           2606    82994 $   operator_events operator_events_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.operator_events
    ADD CONSTRAINT operator_events_pkey PRIMARY KEY (id_op_event);
 N   ALTER TABLE ONLY public.operator_events DROP CONSTRAINT operator_events_pkey;
       public         marabout    false    258            �           2606    83941 0   operatorproductivitys operatorproductivitys_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.operatorproductivitys
    ADD CONSTRAINT operatorproductivitys_pkey PRIMARY KEY (operatorproductivity_id);
 Z   ALTER TABLE ONLY public.operatorproductivitys DROP CONSTRAINT operatorproductivitys_pkey;
       public         marabout    false    298            �           2606    83420    orders order_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT order_pkey PRIMARY KEY (order_id);
 ;   ALTER TABLE ONLY public.orders DROP CONSTRAINT order_pkey;
       public         marabout    false    300            �           2606    74853    permissions permissions_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (permission_id);
 F   ALTER TABLE ONLY public.permissions DROP CONSTRAINT permissions_pkey;
       public         marabout    false    241            �           2606    82870    printers printers_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.printers
    ADD CONSTRAINT printers_pkey PRIMARY KEY (printer_id);
 @   ALTER TABLE ONLY public.printers DROP CONSTRAINT printers_pkey;
       public         marabout    false    256            C           2606    166162    priorities priorities_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.priorities
    ADD CONSTRAINT priorities_pkey PRIMARY KEY (id_priority);
 D   ALTER TABLE ONLY public.priorities DROP CONSTRAINT priorities_pkey;
       public         marabout    false    391            �           2606    74615    profiles profiles_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (profile_id);
 @   ALTER TABLE ONLY public.profiles DROP CONSTRAINT profiles_pkey;
       public         marabout    false    232            �           2606    83442    reports report_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT report_pkey PRIMARY KEY (report_id);
 =   ALTER TABLE ONLY public.reports DROP CONSTRAINT report_pkey;
       public         marabout    false    303                       2606    83930 $   revision_events revision_events_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.revision_events
    ADD CONSTRAINT revision_events_pkey PRIMARY KEY (id_revision);
 N   ALTER TABLE ONLY public.revision_events DROP CONSTRAINT revision_events_pkey;
       public         marabout    false    339            �           2606    75194 &   revision_machine revision_machine_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.revision_machine
    ADD CONSTRAINT revision_machine_pkey PRIMARY KEY (revision_id);
 P   ALTER TABLE ONLY public.revision_machine DROP CONSTRAINT revision_machine_pkey;
       public         marabout    false    248            �           2606    83484    romboldtxts romboldtxt_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.romboldtxts
    ADD CONSTRAINT romboldtxt_pkey PRIMARY KEY (romboldtxt_id);
 E   ALTER TABLE ONLY public.romboldtxts DROP CONSTRAINT romboldtxt_pkey;
       public         marabout    false    305            ;           2606    140618 ,   sequence_operations sequence_operations_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.sequence_operations
    ADD CONSTRAINT sequence_operations_pkey PRIMARY KEY (sequence_operation_id);
 V   ALTER TABLE ONLY public.sequence_operations DROP CONSTRAINT sequence_operations_pkey;
       public         marabout    false    379            /           2606    140248    sequences sequences_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.sequences
    ADD CONSTRAINT sequences_pkey PRIMARY KEY (sequence_id);
 B   ALTER TABLE ONLY public.sequences DROP CONSTRAINT sequences_pkey;
       public         marabout    false    369            �           2606    33438    servers servers_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.servers
    ADD CONSTRAINT servers_pkey PRIMARY KEY (server_id);
 >   ALTER TABLE ONLY public.servers DROP CONSTRAINT servers_pkey;
       public         marabout    false    213            �           2606    24711    sites sites_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.sites
    ADD CONSTRAINT sites_pkey PRIMARY KEY (site_id);
 :   ALTER TABLE ONLY public.sites DROP CONSTRAINT sites_pkey;
       public         marabout    false    199                       2606    91055 $   skill_employees skill_employees_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.skill_employees
    ADD CONSTRAINT skill_employees_pkey PRIMARY KEY (skill_employee_id);
 N   ALTER TABLE ONLY public.skill_employees DROP CONSTRAINT skill_employees_pkey;
       public         marabout    false    348                       2606    91037    skills skills_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (skill_id);
 <   ALTER TABLE ONLY public.skills DROP CONSTRAINT skills_pkey;
       public         marabout    false    346            �           2606    83994    stat_days stat_days_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.stat_days
    ADD CONSTRAINT stat_days_pkey PRIMARY KEY (stat_day_id);
 B   ALTER TABLE ONLY public.stat_days DROP CONSTRAINT stat_days_pkey;
       public         marabout    false    308                        2606    83524    stat_hours stat_hour_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.stat_hours
    ADD CONSTRAINT stat_hour_pkey PRIMARY KEY (stat_hour_id);
 C   ALTER TABLE ONLY public.stat_hours DROP CONSTRAINT stat_hour_pkey;
       public         marabout    false    310                       2606    84005    stat_insts stat_insts_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.stat_insts
    ADD CONSTRAINT stat_insts_pkey PRIMARY KEY (stat_inst_id);
 D   ALTER TABLE ONLY public.stat_insts DROP CONSTRAINT stat_insts_pkey;
       public         marabout    false    313                       2606    83564    stat_months stat_month_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.stat_months
    ADD CONSTRAINT stat_month_pkey PRIMARY KEY (stat_month_id);
 E   ALTER TABLE ONLY public.stat_months DROP CONSTRAINT stat_month_pkey;
       public         marabout    false    315                       2606    83585    stat_weeks stat_week_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.stat_weeks
    ADD CONSTRAINT stat_week_pkey PRIMARY KEY (stat_week_id);
 C   ALTER TABLE ONLY public.stat_weeks DROP CONSTRAINT stat_week_pkey;
       public         marabout    false    318                       2606    83616    stat_years stat_year_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.stat_years
    ADD CONSTRAINT stat_year_pkey PRIMARY KEY (stat_year_id);
 C   ALTER TABLE ONLY public.stat_years DROP CONSTRAINT stat_year_pkey;
       public         marabout    false    321            �           2606    74691 &   status_employees status_employees_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.status_employees
    ADD CONSTRAINT status_employees_pkey PRIMARY KEY (empstatus_id);
 P   ALTER TABLE ONLY public.status_employees DROP CONSTRAINT status_employees_pkey;
       public         marabout    false    234            1           2606    140351 0   status_machine_lights status_machine_lights_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.status_machine_lights
    ADD CONSTRAINT status_machine_lights_pkey PRIMARY KEY (status_machine_light_id);
 Z   ALTER TABLE ONLY public.status_machine_lights DROP CONSTRAINT status_machine_lights_pkey;
       public         marabout    false    370            �           2606    74729 $   status_machines status_machines_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.status_machines
    ADD CONSTRAINT status_machines_pkey PRIMARY KEY (sm_id);
 N   ALTER TABLE ONLY public.status_machines DROP CONSTRAINT status_machines_pkey;
       public         marabout    false    236            ?           2606    164861 ,   status_maintenances status_maintenances_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.status_maintenances
    ADD CONSTRAINT status_maintenances_pkey PRIMARY KEY (status_maintenance_id);
 V   ALTER TABLE ONLY public.status_maintenances DROP CONSTRAINT status_maintenances_pkey;
       public         marabout    false    384            )           2606    164796 "   status_tickets status_tickets_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.status_tickets
    ADD CONSTRAINT status_tickets_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.status_tickets DROP CONSTRAINT status_tickets_pkey;
       public         marabout    false    365            �           2606    74892    status_users status_users_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.status_users
    ADD CONSTRAINT status_users_pkey PRIMARY KEY (user_statusid);
 H   ALTER TABLE ONLY public.status_users DROP CONSTRAINT status_users_pkey;
       public         marabout    false    228            �           2606    32892    jobs tasks_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (job_id);
 9   ALTER TABLE ONLY public.jobs DROP CONSTRAINT tasks_pkey;
       public         marabout    false    207            �           2606    74875 "   terminal_types terminal_types_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.terminal_types
    ADD CONSTRAINT terminal_types_pkey PRIMARY KEY ("Tt_id");
 L   ALTER TABLE ONLY public.terminal_types DROP CONSTRAINT terminal_types_pkey;
       public         marabout    false    226            �           2606    74864    terminals terminals_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.terminals
    ADD CONSTRAINT terminals_pkey PRIMARY KEY ("Terminal_id");
 B   ALTER TABLE ONLY public.terminals DROP CONSTRAINT terminals_pkey;
       public         marabout    false    225            -           2606    164728 4   ticket_feed_attachments ticket_feed_attachments_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.ticket_feed_attachments
    ADD CONSTRAINT ticket_feed_attachments_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.ticket_feed_attachments DROP CONSTRAINT ticket_feed_attachments_pkey;
       public         marabout    false    367            +           2606    164739    ticket_feeds ticket_feeds_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.ticket_feeds
    ADD CONSTRAINT ticket_feeds_pkey PRIMARY KEY (ticket_feed_id);
 H   ALTER TABLE ONLY public.ticket_feeds DROP CONSTRAINT ticket_feeds_pkey;
       public         marabout    false    366            '           2606    164755 (   ticket_structures ticket_structures_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT ticket_structures_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT ticket_structures_pkey;
       public         marabout    false    364            �           2606    24816    tickets tickets_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.tickets DROP CONSTRAINT tickets_pkey;
       public         marabout    false    203            
           2606    83636 +   token_api_listeners token_api_listener_pkey 
   CONSTRAINT     |   ALTER TABLE ONLY public.token_api_listeners
    ADD CONSTRAINT token_api_listener_pkey PRIMARY KEY (token_api_listener_id);
 U   ALTER TABLE ONLY public.token_api_listeners DROP CONSTRAINT token_api_listener_pkey;
       public         marabout    false    324            �           2606    74598    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         marabout    false    229                       2606    83653    usersessions usersession_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.usersessions
    ADD CONSTRAINT usersession_pkey PRIMARY KEY (usersession_id);
 G   ALTER TABLE ONLY public.usersessions DROP CONSTRAINT usersession_pkey;
       public         marabout    false    327                       2606    83669    workfiles workfiles_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.workfiles
    ADD CONSTRAINT workfiles_pkey PRIMARY KEY (workfiles_id);
 B   ALTER TABLE ONLY public.workfiles DROP CONSTRAINT workfiles_pkey;
       public         marabout    false    330            �           1259    74604    fki_group_id    INDEX     B   CREATE INDEX fki_group_id ON public.users USING btree (group_id);
     DROP INDEX public.fki_group_id;
       public         marabout    false    229            �           1259    82831 !   fki_machine_evt_references_events    INDEX     `   CREATE INDEX fki_machine_evt_references_events ON public.machine_events USING btree (event_id);
 5   DROP INDEX public.fki_machine_evt_references_events;
       public         marabout    false    252            �           1259    82825 "   fki_machine_evt_references_machine    INDEX     c   CREATE INDEX fki_machine_evt_references_machine ON public.machine_events USING btree (machine_id);
 6   DROP INDEX public.fki_machine_evt_references_machine;
       public         marabout    false    252            "           1259    131920 .   fki_machine_op_sess_references_machine_session    INDEX     �   CREATE INDEX fki_machine_op_sess_references_machine_session ON public.machine_session_operations USING btree (machine_sess_id);
 B   DROP INDEX public.fki_machine_op_sess_references_machine_session;
       public         marabout    false    360            #           1259    131926 &   fki_machine_sess_op_references_machine    INDEX     s   CREATE INDEX fki_machine_sess_op_references_machine ON public.machine_session_operations USING btree (machine_id);
 :   DROP INDEX public.fki_machine_sess_op_references_machine;
       public         marabout    false    360                       1259    123819 '   fki_machine_sessions_references_machine    INDEX     j   CREATE INDEX fki_machine_sessions_references_machine ON public.machine_sessions USING btree (machine_id);
 ;   DROP INDEX public.fki_machine_sessions_references_machine;
       public         marabout    false    358            �           1259    83086 (   fki_mechanic_events_references_employees    INDEX     k   CREATE INDEX fki_mechanic_events_references_employees ON public.mechanic_events USING btree (employee_id);
 <   DROP INDEX public.fki_mechanic_events_references_employees;
       public         marabout    false    262            �           1259    83051 (   fki_mechanic_events_references_events_ms    INDEX     l   CREATE INDEX fki_mechanic_events_references_events_ms ON public.mechanic_events USING btree (events_ms_id);
 <   DROP INDEX public.fki_mechanic_events_references_events_ms;
       public         marabout    false    262            �           1259    83063 "   fki_mechanic_events_references_job    INDEX     `   CREATE INDEX fki_mechanic_events_references_job ON public.mechanic_events USING btree (job_id);
 6   DROP INDEX public.fki_mechanic_events_references_job;
       public         marabout    false    262            �           1259    83057 &   fki_mechanic_events_references_machine    INDEX     h   CREATE INDEX fki_mechanic_events_references_machine ON public.mechanic_events USING btree (machine_id);
 :   DROP INDEX public.fki_mechanic_events_references_machine;
       public         marabout    false    262            �           1259    83080 '   fki_operator_events_references_employee    INDEX     j   CREATE INDEX fki_operator_events_references_employee ON public.operator_events USING btree (employee_id);
 ;   DROP INDEX public.fki_operator_events_references_employee;
       public         marabout    false    258            �           1259    83023 "   fki_operator_events_references_job    INDEX     `   CREATE INDEX fki_operator_events_references_job ON public.operator_events USING btree (job_id);
 6   DROP INDEX public.fki_operator_events_references_job;
       public         marabout    false    258            �           1259    83017 &   fki_operator_events_references_machine    INDEX     h   CREATE INDEX fki_operator_events_references_machine ON public.operator_events USING btree (machine_id);
 :   DROP INDEX public.fki_operator_events_references_machine;
       public         marabout    false    258            �           1259    83011 %   fki_operator_evt_references_eventsops    INDEX     h   CREATE INDEX fki_operator_evt_references_eventsops ON public.operator_events USING btree (event_op_id);
 9   DROP INDEX public.fki_operator_evt_references_eventsops;
       public         marabout    false    258            �           1259    33332    fki_task_id    INDEX     C   CREATE INDEX fki_task_id ON public.employees USING btree (job_id);
    DROP INDEX public.fki_task_id;
       public         marabout    false    209            J           2618    140311 (   views_operator_login_time_by_day _RETURN    RULE     Q  CREATE OR REPLACE VIEW public.views_operator_login_time_by_day AS
 SELECT usersessions.usersession_id,
    min(usersessions.time_in) AS first_login,
    max(usersessions.time_out) AS last_logout,
        CASE
            WHEN (usersessions.time_out IS NULL) THEN ( SELECT sum((date_part('epoch'::text, (now())::timestamp without time zone) - date_part('epoch'::text, usersessions.time_in))) AS time_passed)
            ELSE ( SELECT sum((date_part('epoch'::text, usersessions.time_out) - date_part('epoch'::text, usersessions.time_in))) AS time_passed)
        END AS time_passed,
    to_char(usersessions.time_in, 'YYYYMMDD'::text) AS date_login
   FROM public.usersessions
  WHERE ((usersessions.time_in IS NOT NULL) AND (usersessions.active = 'Y'::text))
  GROUP BY usersessions.usersession_id, (to_char(usersessions.time_in, 'YYYYMMDD'::text));
 #  CREATE OR REPLACE VIEW public.views_operator_login_time_by_day AS
SELECT
    NULL::integer AS usersession_id,
    NULL::timestamp without time zone AS first_login,
    NULL::timestamp without time zone AS last_logout,
    NULL::double precision AS time_passed,
    NULL::text AS date_login;
       public       marabout    false    327    3852    327    327    327    373            M           2618    140632    views_efficiency _RETURN    RULE     "  CREATE OR REPLACE VIEW public.views_efficiency AS
 SELECT op.operation_id,
    (((sum((date_part('epoch'::text, ('1970-01-01 00:00:00'::timestamp without time zone + (((cps.endtime)::real)::double precision * '00:00:01'::interval))) - date_part('epoch'::text, ('1970-01-01 00:00:00'::timestamp without time zone + (((cps.starttime)::real)::double precision * '00:00:01'::interval))))) * (cop.quantity)::double precision) / ((op."time" * (60)::double precision) * (cop.quantity)::double precision)) * (100)::double precision) AS efficiency
   FROM public.cart_pending_operations cop,
    public.cart_pending_sessions cps,
    public.operations op
  WHERE ((cps.cart_pendingoperation_id = cop.cart_pending_operation_id) AND (op.operation_id = cop.operation_id))
  GROUP BY cop.quantity, op.operation_id;
 �   CREATE OR REPLACE VIEW public.views_efficiency AS
SELECT
    NULL::integer AS operation_id,
    NULL::double precision AS efficiency;
       public       marabout    false    3826    294    294    284    284    284    279    279    279    382            T           2618    140858    views_efficiency_by_day _RETURN    RULE     m  CREATE OR REPLACE VIEW public.views_efficiency_by_day AS
 SELECT op.operation_id,
    (((sum((date_part('epoch'::text, ('1970-01-01 00:00:00'::timestamp without time zone + (((cps.endtime)::real)::double precision * '00:00:01'::interval))) - date_part('epoch'::text, ('1970-01-01 00:00:00'::timestamp without time zone + (((cps.starttime)::real)::double precision * '00:00:01'::interval))))) * (cop.quantity)::double precision) / ((op."time" * (60)::double precision) * (cop.quantity)::double precision)) * (100)::double precision) AS efficiency,
    to_char(('1970-01-01 00:00:00'::timestamp without time zone + (((cps.starttime)::real)::double precision * '00:00:01'::interval)), 'YYYYMMDD'::text) AS date_operation
   FROM public.cart_pending_operations cop,
    public.cart_pending_sessions cps,
    public.operations op
  WHERE ((cps.cart_pendingoperation_id = cop.cart_pending_operation_id) AND (op.operation_id = cop.operation_id))
  GROUP BY op.operation_id, cop.quantity, (to_char(('1970-01-01 00:00:00'::timestamp without time zone + (((cps.starttime)::real)::double precision * '00:00:01'::interval)), 'YYYYMMDD'::text));
 �   CREATE OR REPLACE VIEW public.views_efficiency_by_day AS
SELECT
    NULL::integer AS operation_id,
    NULL::double precision AS efficiency,
    NULL::text AS date_operation;
       public       marabout    false    279    284    284    294    279    279    3826    294    284    394            U           2618    140878 (   views_efficiency_opeartor_by_day _RETURN    RULE     �  CREATE OR REPLACE VIEW public.views_efficiency_opeartor_by_day AS
 SELECT us.employee_id,
    op.operation_id,
    (((sum((date_part('epoch'::text, ('1970-01-01 00:00:00'::timestamp without time zone + (((cps.endtime)::real)::double precision * '00:00:01'::interval))) - date_part('epoch'::text, ('1970-01-01 00:00:00'::timestamp without time zone + (((cps.starttime)::real)::double precision * '00:00:01'::interval))))) * (cop.quantity)::double precision) / ((op."time" * (60)::double precision) * (cop.quantity)::double precision)) * (100)::double precision) AS efficiency,
    to_char(('1970-01-01 00:00:00'::timestamp without time zone + (((cps.starttime)::real)::double precision * '00:00:01'::interval)), 'YYYYMMDD'::text) AS date_operation
   FROM public.cart_pending_operations cop,
    public.cart_pending_sessions cps,
    public.operations op,
    public.usersessions us
  WHERE ((cps.cart_pendingoperation_id = cop.cart_pending_operation_id) AND (op.operation_id = cop.operation_id) AND (us.usersession_id = cps.session_id))
  GROUP BY op.operation_id, cop.quantity, (to_char(('1970-01-01 00:00:00'::timestamp without time zone + (((cps.starttime)::real)::double precision * '00:00:01'::interval)), 'YYYYMMDD'::text)), us.employee_id;
 �   CREATE OR REPLACE VIEW public.views_efficiency_opeartor_by_day AS
SELECT
    NULL::integer AS employee_id,
    NULL::integer AS operation_id,
    NULL::double precision AS efficiency,
    NULL::text AS date_operation;
       public       marabout    false    284    279    279    279    284    284    284    294    294    327    327    3826    395            V           2618    174297 #   views_maintenance_task_data _RETURN    RULE       CREATE OR REPLACE VIEW public.views_maintenance_task_data AS
 SELECT mtsk.created_at,
    mtsk.machine_id,
    mtsk.department_id,
    mtsk.bug_description,
    mtsk.owner_id,
    mtsk.active,
    mtsk.created_by,
    mtsk.maintenance_task_id,
    mtsk.maintenance_status_id,
    mtsk.source,
    mtsk.maintenance_template_id,
    mtsk.repared_by,
    m.line_id,
    to_char(((mtsk.created_at)::date)::timestamp with time zone, 'yyyymmdd'::text) AS day_maintenance_task,
    to_char(((max(mfd.started_at))::date)::timestamp with time zone, 'yyyymmdd'::text) AS day_last_maintenance_feed,
    concat(to_char(((mtsk.created_at)::date)::timestamp with time zone, 'yyyymmdd'::text), to_char(((mtsk.created_at)::time without time zone)::interval, 'HH24'::text)) AS date_hour_maintenance_task,
    count(mfd.maintenance_feed_id) AS count_feeds,
    min(mfd.started_at) AS first_maintenance_feed_start,
    max(mfd.finished_at) AS last_maintenance_feed_end,
    sum((((date_part('epoch'::text, mfd.finished_at) - date_part('epoch'::text, mfd.started_at)))::real)::integer) AS total_time_maintenance,
        CASE
            WHEN (mtsk.maintenance_status_id = 1) THEN (date_part('epoch'::text, max(mfd.finished_at)) - date_part('epoch'::text, mtsk.created_at))
            ELSE (date_part('epoch'::text, CURRENT_TIMESTAMP) - date_part('epoch'::text, mtsk.created_at))
        END AS offline_duration
   FROM ((public.maintenance_tasks mtsk
     LEFT JOIN public.machines m ON (((m.machine_id = mtsk.machine_id) AND (m.active = 'Y'::text))))
     LEFT JOIN public.maintenance_feeds mfd ON (((mfd.maintenance_task_id = mtsk.maintenance_task_id) AND (mfd.active = 'Y'::text) AND (mfd.started_at IS NOT NULL) AND (mfd.finished_at IS NOT NULL))))
  WHERE (mtsk.active = 'Y'::text)
  GROUP BY mtsk.maintenance_task_id, m.line_id;
 �  CREATE OR REPLACE VIEW public.views_maintenance_task_data AS
SELECT
    NULL::timestamp without time zone AS created_at,
    NULL::integer AS machine_id,
    NULL::integer AS department_id,
    NULL::text AS bug_description,
    NULL::integer AS owner_id,
    NULL::text AS active,
    NULL::integer AS created_by,
    NULL::integer AS maintenance_task_id,
    NULL::integer AS maintenance_status_id,
    NULL::text AS source,
    NULL::integer AS maintenance_template_id,
    NULL::integer AS repared_by,
    NULL::integer AS line_id,
    NULL::text AS day_maintenance_task,
    NULL::text AS day_last_maintenance_feed,
    NULL::text AS date_hour_maintenance_task,
    NULL::bigint AS count_feeds,
    NULL::timestamp without time zone AS first_maintenance_feed_start,
    NULL::timestamp without time zone AS last_maintenance_feed_end,
    NULL::bigint AS total_time_maintenance,
    NULL::double precision AS offline_duration;
       public       marabout    false    383    205    383    205    383    385    385    385    385    385    3901    383    383    383    383    383    383    383    383    205    383    409            �           2620    83945 !   machine_events log_machine_events    TRIGGER     �   CREATE TRIGGER log_machine_events AFTER INSERT OR UPDATE ON public.machine_events FOR EACH ROW EXECUTE PROCEDURE public.revision_events();
 :   DROP TRIGGER log_machine_events ON public.machine_events;
       public       marabout    false    252    453            �           2620    83946    machines revision_machine    TRIGGER     �   CREATE TRIGGER revision_machine AFTER INSERT OR UPDATE ON public.machines FOR EACH ROW EXECUTE PROCEDURE public.revision_machines();
 2   DROP TRIGGER revision_machine ON public.machines;
       public       marabout    false    205    446            \           2606    82864 (   terminals Terminal_configuration_file_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.terminals
    ADD CONSTRAINT "Terminal_configuration_file_id" FOREIGN KEY ("Terminal_configuration_file_id") REFERENCES public.efiles(file_id);
 T   ALTER TABLE ONLY public.terminals DROP CONSTRAINT "Terminal_configuration_file_id";
       public       marabout    false    246    225    3774            ]           2606    74876    terminals Tt_id    FK CONSTRAINT     ~   ALTER TABLE ONLY public.terminals
    ADD CONSTRAINT "Tt_id" FOREIGN KEY ("Tt_id") REFERENCES public.terminal_types("Tt_id");
 ;   ALTER TABLE ONLY public.terminals DROP CONSTRAINT "Tt_id";
       public       marabout    false    225    226    3757            �           2606    83723    orders article_id    FK CONSTRAINT     ~   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT article_id FOREIGN KEY (article_id) REFERENCES public.articles(article_id);
 ;   ALTER TABLE ONLY public.orders DROP CONSTRAINT article_id;
       public       marabout    false    265    3804    300            �           2606    123793 &   article_operation_templates article_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.article_operation_templates
    ADD CONSTRAINT article_id FOREIGN KEY (article_id) REFERENCES public.articles(article_id);
 P   ALTER TABLE ONLY public.article_operation_templates DROP CONSTRAINT article_id;
       public       marabout    false    3804    265    356            U           2606    82854    boxes box_configuration_file    FK CONSTRAINT     �   ALTER TABLE ONLY public.boxes
    ADD CONSTRAINT box_configuration_file FOREIGN KEY (box_configuration_file) REFERENCES public.efiles(file_id);
 F   ALTER TABLE ONLY public.boxes DROP CONSTRAINT box_configuration_file;
       public       marabout    false    3774    222    246            �           2606    83909    usersessions box_id    FK CONSTRAINT     u   ALTER TABLE ONLY public.usersessions
    ADD CONSTRAINT box_id FOREIGN KEY (box_id) REFERENCES public.boxes(box_id);
 =   ALTER TABLE ONLY public.usersessions DROP CONSTRAINT box_id;
       public       marabout    false    3749    222    327            �           2606    83960    reports box_id    FK CONSTRAINT     p   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT box_id FOREIGN KEY (box_id) REFERENCES public.boxes(box_id);
 8   ALTER TABLE ONLY public.reports DROP CONSTRAINT box_id;
       public       marabout    false    303    222    3749            �           2606    140401    ticket_structures box_id    FK CONSTRAINT     z   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT box_id FOREIGN KEY (box_id) REFERENCES public.boxes(box_id);
 B   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT box_id;
       public       marabout    false    364    3749    222            �           2606    140502    notifications box_id    FK CONSTRAINT     v   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT box_id FOREIGN KEY (box_id) REFERENCES public.boxes(box_id);
 >   ALTER TABLE ONLY public.notifications DROP CONSTRAINT box_id;
       public       marabout    false    377    222    3749            o           2606    83714    breaks breaktype_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.breaks
    ADD CONSTRAINT breaktype_id FOREIGN KEY (breaktype_id) REFERENCES public.break_types(break_type_id);
 =   ALTER TABLE ONLY public.breaks DROP CONSTRAINT breaktype_id;
       public       marabout    false    267    3808    270            X           2606    74817    boxes bt_id    FK CONSTRAINT     o   ALTER TABLE ONLY public.boxes
    ADD CONSTRAINT bt_id FOREIGN KEY (bt_id) REFERENCES public.box_types(bt_id);
 5   ALTER TABLE ONLY public.boxes DROP CONSTRAINT bt_id;
       public       marabout    false    222    3759    227            �           2606    83965    reports bundle_id    FK CONSTRAINT     {   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT bundle_id FOREIGN KEY (bundle_id) REFERENCES public.bundles(bundle_id);
 ;   ALTER TABLE ONLY public.reports DROP CONSTRAINT bundle_id;
       public       marabout    false    272    3810    303            �           2606    123759    operations bundle_id    FK CONSTRAINT     ~   ALTER TABLE ONLY public.operations
    ADD CONSTRAINT bundle_id FOREIGN KEY (bundle_id) REFERENCES public.bundles(bundle_id);
 >   ALTER TABLE ONLY public.operations DROP CONSTRAINT bundle_id;
       public       marabout    false    294    272    3810            �           2606    140391    ticket_structures bundle_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT bundle_id FOREIGN KEY (bundle_id) REFERENCES public.bundles(bundle_id);
 E   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT bundle_id;
       public       marabout    false    272    364    3810            �           2606    140512    notifications bundle_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT bundle_id FOREIGN KEY (bundle_id) REFERENCES public.bundles(bundle_id);
 A   ALTER TABLE ONLY public.notifications DROP CONSTRAINT bundle_id;
       public       marabout    false    3810    377    272            �           2606    83914    usersessions cart_id    FK CONSTRAINT     x   ALTER TABLE ONLY public.usersessions
    ADD CONSTRAINT cart_id FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);
 >   ALTER TABLE ONLY public.usersessions DROP CONSTRAINT cart_id;
       public       marabout    false    3814    327    277            �           2606    83970    reports cart_id    FK CONSTRAINT     s   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT cart_id FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);
 9   ALTER TABLE ONLY public.reports DROP CONSTRAINT cart_id;
       public       marabout    false    303    3814    277            p           2606    123732    break_types category_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.break_types
    ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES public.break_type_categories(category_id);
 A   ALTER TABLE ONLY public.break_types DROP CONSTRAINT category_id;
       public       marabout    false    352    3866    270            `           2606    74621    users client_id    FK CONSTRAINT     y   ALTER TABLE ONLY public.users
    ADD CONSTRAINT client_id FOREIGN KEY (client_id) REFERENCES public.clients(client_id);
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT client_id;
       public       marabout    false    3724    197    229            G           2606    74661    sites client_id    FK CONSTRAINT     y   ALTER TABLE ONLY public.sites
    ADD CONSTRAINT client_id FOREIGN KEY (client_id) REFERENCES public.clients(client_id);
 9   ALTER TABLE ONLY public.sites DROP CONSTRAINT client_id;
       public       marabout    false    199    197    3724            �           2606    123738    orders client_id    FK CONSTRAINT     z   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT client_id FOREIGN KEY (client_id) REFERENCES public.clients(client_id);
 :   ALTER TABLE ONLY public.orders DROP CONSTRAINT client_id;
       public       marabout    false    3724    300    197            Y           2606    82859    gateways configuration_file_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.gateways
    ADD CONSTRAINT configuration_file_id FOREIGN KEY (configuration_file_id) REFERENCES public.efiles(file_id);
 H   ALTER TABLE ONLY public.gateways DROP CONSTRAINT configuration_file_id;
       public       marabout    false    3774    246    223            F           2606    74651    clients country_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT country_id FOREIGN KEY (country_id) REFERENCES public.countries(country_id);
 <   ALTER TABLE ONLY public.clients DROP CONSTRAINT country_id;
       public       marabout    false    197    217    3743            H           2606    74656    sites country_id    FK CONSTRAINT     ~   ALTER TABLE ONLY public.sites
    ADD CONSTRAINT country_id FOREIGN KEY (country_id) REFERENCES public.countries(country_id);
 :   ALTER TABLE ONLY public.sites DROP CONSTRAINT country_id;
       public       marabout    false    3743    199    217            �           2606    140381    ticket_structures created_by    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT created_by FOREIGN KEY (created_by) REFERENCES public.users(user_id);
 F   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT created_by;
       public       marabout    false    3764    229    364            �           2606    140527    notifications created_by    FK CONSTRAINT        ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT created_by FOREIGN KEY (created_by) REFERENCES public.users(user_id);
 B   ALTER TABLE ONLY public.notifications DROP CONSTRAINT created_by;
       public       marabout    false    3764    229    377            �           2606    140598    ticket_feeds created_by    FK CONSTRAINT     ~   ALTER TABLE ONLY public.ticket_feeds
    ADD CONSTRAINT created_by FOREIGN KEY (created_by) REFERENCES public.users(user_id);
 A   ALTER TABLE ONLY public.ticket_feeds DROP CONSTRAINT created_by;
       public       marabout    false    229    3764    366            �           2606    140850    maintenance_tasks created_by    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_tasks
    ADD CONSTRAINT created_by FOREIGN KEY (created_by) REFERENCES public.users(user_id);
 F   ALTER TABLE ONLY public.maintenance_tasks DROP CONSTRAINT created_by;
       public       marabout    false    229    3764    383            �           2606    164802 #   ticket_structures current_status_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT current_status_id FOREIGN KEY (current_status_id) REFERENCES public.status_tickets(id);
 M   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT current_status_id;
       public       marabout    false    365    3881    364            �           2606    148297 $   maintenance_templates departement_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_templates
    ADD CONSTRAINT departement_id FOREIGN KEY (departement_id) REFERENCES public.jobs(job_id);
 N   ALTER TABLE ONLY public.maintenance_templates DROP CONSTRAINT departement_id;
       public       marabout    false    3734    392    207            �           2606    140171    ticket_structures department_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT department_id FOREIGN KEY (department_id) REFERENCES public.jobs(job_id);
 I   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT department_id;
       public       marabout    false    207    3734    364            �           2606    140352    ticket_feeds department_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_feeds
    ADD CONSTRAINT department_id FOREIGN KEY (department_id) REFERENCES public.jobs(job_id);
 D   ALTER TABLE ONLY public.ticket_feeds DROP CONSTRAINT department_id;
       public       marabout    false    366    3734    207            �           2606    140668    maintenance_tasks department_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_tasks
    ADD CONSTRAINT department_id FOREIGN KEY (department_id) REFERENCES public.jobs(job_id);
 I   ALTER TABLE ONLY public.maintenance_tasks DROP CONSTRAINT department_id;
       public       marabout    false    3734    383    207            �           2606    140688    maintenance_feeds department_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_feeds
    ADD CONSTRAINT department_id FOREIGN KEY (department_id) REFERENCES public.jobs(job_id);
 I   ALTER TABLE ONLY public.maintenance_feeds DROP CONSTRAINT department_id;
       public       marabout    false    3734    207    385            �           2606    91066    skill_employees emp_id    FK CONSTRAINT     |   ALTER TABLE ONLY public.skill_employees
    ADD CONSTRAINT emp_id FOREIGN KEY (emp_id) REFERENCES public.employees(emp_id);
 @   ALTER TABLE ONLY public.skill_employees DROP CONSTRAINT emp_id;
       public       marabout    false    209    3736    348            �           2606    91074    usersessions employee_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.usersessions
    ADD CONSTRAINT employee_id FOREIGN KEY (employee_id) REFERENCES public.employees(emp_id);
 B   ALTER TABLE ONLY public.usersessions DROP CONSTRAINT employee_id;
       public       marabout    false    327    209    3736            �           2606    140497    notifications employee_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT employee_id FOREIGN KEY (employee_id) REFERENCES public.employees(emp_id);
 C   ALTER TABLE ONLY public.notifications DROP CONSTRAINT employee_id;
       public       marabout    false    377    209    3736            �           2606    140545    notification_reads employee_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.notification_reads
    ADD CONSTRAINT employee_id FOREIGN KEY (employee_id) REFERENCES public.employees(emp_id);
 H   ALTER TABLE ONLY public.notification_reads DROP CONSTRAINT employee_id;
       public       marabout    false    378    209    3736            P           2606    74702    employees empstatus_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT empstatus_id FOREIGN KEY (empstatus_id) REFERENCES public.status_employees(empstatus_id);
 @   ALTER TABLE ONLY public.employees DROP CONSTRAINT empstatus_id;
       public       marabout    false    234    3768    209            �           2606    140436    ticket_feed_attachments file_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_feed_attachments
    ADD CONSTRAINT file_id FOREIGN KEY (file_id) REFERENCES public.efiles(file_id);
 I   ALTER TABLE ONLY public.ticket_feed_attachments DROP CONSTRAINT file_id;
       public       marabout    false    367    3774    246            u           2606    83764    bundle_carts fk1_card    FK CONSTRAINT     y   ALTER TABLE ONLY public.bundle_carts
    ADD CONSTRAINT fk1_card FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);
 ?   ALTER TABLE ONLY public.bundle_carts DROP CONSTRAINT fk1_card;
       public       marabout    false    277    275    3814            R           2606    57365    client_user fk1_client    FK CONSTRAINT     y   ALTER TABLE ONLY public.client_user
    ADD CONSTRAINT fk1_client FOREIGN KEY (id) REFERENCES public.clients(client_id);
 @   ALTER TABLE ONLY public.client_user DROP CONSTRAINT fk1_client;
       public       marabout    false    197    220    3724            v           2606    83774 %   cart_pending_operations fk1_operation    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_pending_operations
    ADD CONSTRAINT fk1_operation FOREIGN KEY (operation_id) REFERENCES public.operations(operation_id);
 O   ALTER TABLE ONLY public.cart_pending_operations DROP CONSTRAINT fk1_operation;
       public       marabout    false    3826    294    279            y           2606    83789 !   cart_pending_sessions fk1_session    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_pending_sessions
    ADD CONSTRAINT fk1_session FOREIGN KEY (session_id) REFERENCES public.usersessions(usersession_id);
 K   ALTER TABLE ONLY public.cart_pending_sessions DROP CONSTRAINT fk1_session;
       public       marabout    false    3852    284    327            I           2606    74707    groups fk1_site    FK CONSTRAINT     s   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT fk1_site FOREIGN KEY (site_id) REFERENCES public.sites(site_id);
 9   ALTER TABLE ONLY public.groups DROP CONSTRAINT fk1_site;
       public       marabout    false    3726    199    201            �           2606    83845    operatorproductivitys fk1_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.operatorproductivitys
    ADD CONSTRAINT fk1_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 H   ALTER TABLE ONLY public.operatorproductivitys DROP CONSTRAINT fk1_user;
       public       marabout    false    3764    298    229            w           2606    83779 #   cart_pending_operations fk2_buindle    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_pending_operations
    ADD CONSTRAINT fk2_buindle FOREIGN KEY (bundle_id) REFERENCES public.bundles(bundle_id);
 M   ALTER TABLE ONLY public.cart_pending_operations DROP CONSTRAINT fk2_buindle;
       public       marabout    false    279    3810    272            |           2606    83809 $   cart_reopened_operations fk2_buindle    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_reopened_operations
    ADD CONSTRAINT fk2_buindle FOREIGN KEY (bundle_id) REFERENCES public.bundles(bundle_id);
 N   ALTER TABLE ONLY public.cart_reopened_operations DROP CONSTRAINT fk2_buindle;
       public       marabout    false    3810    272    287            t           2606    83860    bundle_carts fk2_buindle_card    FK CONSTRAINT     �   ALTER TABLE ONLY public.bundle_carts
    ADD CONSTRAINT fk2_buindle_card FOREIGN KEY (bundle_id) REFERENCES public.bundles(bundle_id);
 G   ALTER TABLE ONLY public.bundle_carts DROP CONSTRAINT fk2_buindle_card;
       public       marabout    false    272    3810    275            }           2606    83814 !   cart_reopened_operations fk3_card    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_reopened_operations
    ADD CONSTRAINT fk3_card FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id);
 K   ALTER TABLE ONLY public.cart_reopened_operations DROP CONSTRAINT fk3_card;
       public       marabout    false    287    3814    277            x           2606    83784 #   cart_pending_operations fk3_machine    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_pending_operations
    ADD CONSTRAINT fk3_machine FOREIGN KEY (machine_id) REFERENCES public.machines(machine_id);
 M   ALTER TABLE ONLY public.cart_pending_operations DROP CONSTRAINT fk3_machine;
       public       marabout    false    205    3732    279            z           2606    83799 +   cart_pending_sessions fk3_pending_operation    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_pending_sessions
    ADD CONSTRAINT fk3_pending_operation FOREIGN KEY (cart_pendingoperation_id) REFERENCES public.cart_pending_operations(cart_pending_operation_id);
 U   ALTER TABLE ONLY public.cart_pending_sessions DROP CONSTRAINT fk3_pending_operation;
       public       marabout    false    3816    284    279            ~           2606    83819 &   cart_reopened_operations fk4_operation    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_reopened_operations
    ADD CONSTRAINT fk4_operation FOREIGN KEY (operation_id) REFERENCES public.operations(operation_id);
 P   ALTER TABLE ONLY public.cart_reopened_operations DROP CONSTRAINT fk4_operation;
       public       marabout    false    294    287    3826                       2606    83824     cart_reopened_operations fk5_box    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_reopened_operations
    ADD CONSTRAINT fk5_box FOREIGN KEY (box_id) REFERENCES public.boxes(box_id);
 J   ALTER TABLE ONLY public.cart_reopened_operations DROP CONSTRAINT fk5_box;
       public       marabout    false    287    222    3749            {           2606    83804     cart_reopened_operations fk_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_reopened_operations
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 J   ALTER TABLE ONLY public.cart_reopened_operations DROP CONSTRAINT fk_user;
       public       marabout    false    287    229    3764            ^           2606    74599    users group_id    FK CONSTRAINT     u   ALTER TABLE ONLY public.users
    ADD CONSTRAINT group_id FOREIGN KEY (group_id) REFERENCES public.groups(group_id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT group_id;
       public       marabout    false    229    201    3728            O           2606    74676    employees group_id    FK CONSTRAINT     y   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT group_id FOREIGN KEY (group_id) REFERENCES public.groups(group_id);
 <   ALTER TABLE ONLY public.employees DROP CONSTRAINT group_id;
       public       marabout    false    209    201    3728            �           2606    90990    machine_groups group_id    FK CONSTRAINT     ~   ALTER TABLE ONLY public.machine_groups
    ADD CONSTRAINT group_id FOREIGN KEY (group_id) REFERENCES public.groups(group_id);
 A   ALTER TABLE ONLY public.machine_groups DROP CONSTRAINT group_id;
       public       marabout    false    344    3728    201            T           2606    74841    boxes gw_id    FK CONSTRAINT     n   ALTER TABLE ONLY public.boxes
    ADD CONSTRAINT gw_id FOREIGN KEY (gw_id) REFERENCES public.gateways(gw_id);
 5   ALTER TABLE ONLY public.boxes DROP CONSTRAINT gw_id;
       public       marabout    false    223    3751    222            [           2606    74766    gateways gwt_id    FK CONSTRAINT     y   ALTER TABLE ONLY public.gateways
    ADD CONSTRAINT gwt_id FOREIGN KEY (gwt_id) REFERENCES public.gateway_types(gwt_id);
 9   ALTER TABLE ONLY public.gateways DROP CONSTRAINT gwt_id;
       public       marabout    false    224    3753    223            b           2606    75284 "   has_permissions has_permission_fk1    FK CONSTRAINT     �   ALTER TABLE ONLY public.has_permissions
    ADD CONSTRAINT has_permission_fk1 FOREIGN KEY (has_permissions_profild_id) REFERENCES public.profiles(profile_id);
 L   ALTER TABLE ONLY public.has_permissions DROP CONSTRAINT has_permission_fk1;
       public       marabout    false    3766    232    250            a           2606    75289 "   has_permissions has_permission_fk2    FK CONSTRAINT     �   ALTER TABLE ONLY public.has_permissions
    ADD CONSTRAINT has_permission_fk2 FOREIGN KEY (has_permissions_permission_id) REFERENCES public.permissions(permission_id);
 L   ALTER TABLE ONLY public.has_permissions DROP CONSTRAINT has_permission_fk2;
       public       marabout    false    250    241    3772            �           2606    166163    ticket_structures id_priority    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT id_priority FOREIGN KEY (id_priority) REFERENCES public.priorities(id_priority);
 G   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT id_priority;
       public       marabout    false    3907    364    391            �           2606    140603    ticket_feeds image_id    FK CONSTRAINT     {   ALTER TABLE ONLY public.ticket_feeds
    ADD CONSTRAINT image_id FOREIGN KEY (image_id) REFERENCES public.efiles(file_id);
 ?   ALTER TABLE ONLY public.ticket_feeds DROP CONSTRAINT image_id;
       public       marabout    false    246    366    3774            �           2606    140801    ticket_structures image_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT image_id FOREIGN KEY (image_id) REFERENCES public.efiles(file_id);
 D   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT image_id;
       public       marabout    false    3774    246    364            N           2606    74671    employees job_id    FK CONSTRAINT     q   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT job_id FOREIGN KEY (job_id) REFERENCES public.jobs(job_id);
 :   ALTER TABLE ONLY public.employees DROP CONSTRAINT job_id;
       public       marabout    false    209    207    3734            K           2606    74735    machines line_id    FK CONSTRAINT     t   ALTER TABLE ONLY public.machines
    ADD CONSTRAINT line_id FOREIGN KEY (line_id) REFERENCES public.lines(line_id);
 :   ALTER TABLE ONLY public.machines DROP CONSTRAINT line_id;
       public       marabout    false    219    205    3745            V           2606    74796    boxes line_id    FK CONSTRAINT     q   ALTER TABLE ONLY public.boxes
    ADD CONSTRAINT line_id FOREIGN KEY (line_id) REFERENCES public.lines(line_id);
 7   ALTER TABLE ONLY public.boxes DROP CONSTRAINT line_id;
       public       marabout    false    219    3745    222            �           2606    140149    operations line_id    FK CONSTRAINT     v   ALTER TABLE ONLY public.operations
    ADD CONSTRAINT line_id FOREIGN KEY (line_id) REFERENCES public.lines(line_id);
 <   ALTER TABLE ONLY public.operations DROP CONSTRAINT line_id;
       public       marabout    false    294    219    3745            �           2606    140166    ticket_structures line_id    FK CONSTRAINT     }   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT line_id FOREIGN KEY (line_id) REFERENCES public.lines(line_id);
 C   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT line_id;
       public       marabout    false    219    3745    364            �           2606    140522    notifications line_id    FK CONSTRAINT     y   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT line_id FOREIGN KEY (line_id) REFERENCES public.lines(line_id);
 ?   ALTER TABLE ONLY public.notifications DROP CONSTRAINT line_id;
       public       marabout    false    377    219    3745            c           2606    82826 ,   machine_events machine_evt_references_events    FK CONSTRAINT     �   ALTER TABLE ONLY public.machine_events
    ADD CONSTRAINT machine_evt_references_events FOREIGN KEY (event_id) REFERENCES public.events(event_id);
 V   ALTER TABLE ONLY public.machine_events DROP CONSTRAINT machine_evt_references_events;
       public       marabout    false    254    3784    252            d           2606    82820 -   machine_events machine_evt_references_machine    FK CONSTRAINT     �   ALTER TABLE ONLY public.machine_events
    ADD CONSTRAINT machine_evt_references_machine FOREIGN KEY (machine_id) REFERENCES public.machines(machine_id);
 W   ALTER TABLE ONLY public.machine_events DROP CONSTRAINT machine_evt_references_machine;
       public       marabout    false    3732    252    205            �           2606    107342    operations machine_groupe_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.operations
    ADD CONSTRAINT machine_groupe_id FOREIGN KEY (machine_groupe_id) REFERENCES public.machine_groups(machine_group_id);
 F   ALTER TABLE ONLY public.operations DROP CONSTRAINT machine_groupe_id;
       public       marabout    false    294    3858    344            S           2606    74822    boxes machine_id    FK CONSTRAINT     }   ALTER TABLE ONLY public.boxes
    ADD CONSTRAINT machine_id FOREIGN KEY (machine_id) REFERENCES public.machines(machine_id);
 :   ALTER TABLE ONLY public.boxes DROP CONSTRAINT machine_id;
       public       marabout    false    205    222    3732            �           2606    90985    machine_groups machine_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.machine_groups
    ADD CONSTRAINT machine_id FOREIGN KEY (machine_id) REFERENCES public.machines(machine_id);
 C   ALTER TABLE ONLY public.machine_groups DROP CONSTRAINT machine_id;
       public       marabout    false    3732    205    344            �           2606    140507    notifications machine_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT machine_id FOREIGN KEY (machine_id) REFERENCES public.machines(machine_id);
 B   ALTER TABLE ONLY public.notifications DROP CONSTRAINT machine_id;
       public       marabout    false    3732    377    205            �           2606    140663    maintenance_tasks machine_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_tasks
    ADD CONSTRAINT machine_id FOREIGN KEY (machine_id) REFERENCES public.machines(machine_id);
 F   ALTER TABLE ONLY public.maintenance_tasks DROP CONSTRAINT machine_id;
       public       marabout    false    205    3732    383            �           2606    131915 E   machine_session_operations machine_op_sess_references_machine_session    FK CONSTRAINT     �   ALTER TABLE ONLY public.machine_session_operations
    ADD CONSTRAINT machine_op_sess_references_machine_session FOREIGN KEY (machine_sess_id) REFERENCES public.machine_sessions(machine_session_id);
 o   ALTER TABLE ONLY public.machine_session_operations DROP CONSTRAINT machine_op_sess_references_machine_session;
       public       marabout    false    360    3873    358            �           2606    131921 =   machine_session_operations machine_sess_op_references_machine    FK CONSTRAINT     �   ALTER TABLE ONLY public.machine_session_operations
    ADD CONSTRAINT machine_sess_op_references_machine FOREIGN KEY (machine_id) REFERENCES public.machines(machine_id);
 g   ALTER TABLE ONLY public.machine_session_operations DROP CONSTRAINT machine_sess_op_references_machine;
       public       marabout    false    205    360    3732            �           2606    123814 4   machine_sessions machine_sessions_references_machine    FK CONSTRAINT     �   ALTER TABLE ONLY public.machine_sessions
    ADD CONSTRAINT machine_sessions_references_machine FOREIGN KEY (machine_id) REFERENCES public.machines(machine_id);
 ^   ALTER TABLE ONLY public.machine_sessions DROP CONSTRAINT machine_sessions_references_machine;
       public       marabout    false    358    205    3732            L           2606    99160    machines machine_type_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.machines
    ADD CONSTRAINT machine_type_id FOREIGN KEY (machine_type_id) REFERENCES public.machine_types(machine_type_id);
 B   ALTER TABLE ONLY public.machines DROP CONSTRAINT machine_type_id;
       public       marabout    false    3864    350    205            �           2606    107362    operations machine_type_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.operations
    ADD CONSTRAINT machine_type_id FOREIGN KEY (machine_type_id) REFERENCES public.machine_types(machine_type_id);
 D   ALTER TABLE ONLY public.operations DROP CONSTRAINT machine_type_id;
       public       marabout    false    294    3864    350            �           2606    123775 #   operation_templates machine_type_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.operation_templates
    ADD CONSTRAINT machine_type_id FOREIGN KEY (machine_type_id) REFERENCES public.machine_types(machine_type_id);
 M   ALTER TABLE ONLY public.operation_templates DROP CONSTRAINT machine_type_id;
       public       marabout    false    350    354    3864            �           2606    164862 '   maintenance_tasks maintenance_status_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_tasks
    ADD CONSTRAINT maintenance_status_id FOREIGN KEY (maintenance_status_id) REFERENCES public.status_maintenances(status_maintenance_id);
 Q   ALTER TABLE ONLY public.maintenance_tasks DROP CONSTRAINT maintenance_status_id;
       public       marabout    false    383    3903    384            �           2606    164830 %   maintenance_feeds maintenance_task_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_feeds
    ADD CONSTRAINT maintenance_task_id FOREIGN KEY (maintenance_task_id) REFERENCES public.maintenance_tasks(maintenance_task_id);
 O   ALTER TABLE ONLY public.maintenance_feeds DROP CONSTRAINT maintenance_task_id;
       public       marabout    false    385    3901    383            �           2606    164846 )   maintenance_feeds maintenance_template_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_feeds
    ADD CONSTRAINT maintenance_template_id FOREIGN KEY (maintenance_template_id) REFERENCES public.maintenance_templates(maintenance_template_id);
 S   ALTER TABLE ONLY public.maintenance_feeds DROP CONSTRAINT maintenance_template_id;
       public       marabout    false    3909    385    392            �           2606    173255 )   maintenance_tasks maintenance_template_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_tasks
    ADD CONSTRAINT maintenance_template_id FOREIGN KEY (maintenance_template_id) REFERENCES public.maintenance_templates(maintenance_template_id);
 S   ALTER TABLE ONLY public.maintenance_tasks DROP CONSTRAINT maintenance_template_id;
       public       marabout    false    383    3909    392            m           2606    83081 4   mechanic_events mechanic_events_references_employees    FK CONSTRAINT     �   ALTER TABLE ONLY public.mechanic_events
    ADD CONSTRAINT mechanic_events_references_employees FOREIGN KEY (employee_id) REFERENCES public.employees(emp_id);
 ^   ALTER TABLE ONLY public.mechanic_events DROP CONSTRAINT mechanic_events_references_employees;
       public       marabout    false    262    3736    209            j           2606    83046 4   mechanic_events mechanic_events_references_events_ms    FK CONSTRAINT     �   ALTER TABLE ONLY public.mechanic_events
    ADD CONSTRAINT mechanic_events_references_events_ms FOREIGN KEY (events_ms_id) REFERENCES public.events_ms(events_ms_id);
 ^   ALTER TABLE ONLY public.mechanic_events DROP CONSTRAINT mechanic_events_references_events_ms;
       public       marabout    false    262    3802    264            l           2606    83058 .   mechanic_events mechanic_events_references_job    FK CONSTRAINT     �   ALTER TABLE ONLY public.mechanic_events
    ADD CONSTRAINT mechanic_events_references_job FOREIGN KEY (job_id) REFERENCES public.jobs(job_id);
 X   ALTER TABLE ONLY public.mechanic_events DROP CONSTRAINT mechanic_events_references_job;
       public       marabout    false    3734    262    207            k           2606    83052 2   mechanic_events mechanic_events_references_machine    FK CONSTRAINT     �   ALTER TABLE ONLY public.mechanic_events
    ADD CONSTRAINT mechanic_events_references_machine FOREIGN KEY (machine_id) REFERENCES public.machines(machine_id);
 \   ALTER TABLE ONLY public.mechanic_events DROP CONSTRAINT mechanic_events_references_machine;
       public       marabout    false    205    262    3732            �           2606    164713 "   notification_reads notification_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.notification_reads
    ADD CONSTRAINT notification_id FOREIGN KEY (notification_id) REFERENCES public.notifications(notification_id);
 L   ALTER TABLE ONLY public.notification_reads DROP CONSTRAINT notification_id;
       public       marabout    false    378    377    3895            �           2606    164781     ticket_structures observation_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT observation_id FOREIGN KEY (observation_id) REFERENCES public.observations(observation_id);
 J   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT observation_id;
       public       marabout    false    3893    364    374            q           2606    83881    bundles operation_groupe_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.bundles
    ADD CONSTRAINT operation_groupe_id FOREIGN KEY (operation_groupe_id) REFERENCES public.operation_groupes(operation_groupe_id);
 E   ALTER TABLE ONLY public.bundles DROP CONSTRAINT operation_groupe_id;
       public       marabout    false    272    3828    296            �           2606    83955    reports operation_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT operation_id FOREIGN KEY (operation_id) REFERENCES public.operations(operation_id);
 >   ALTER TABLE ONLY public.reports DROP CONSTRAINT operation_id;
       public       marabout    false    303    294    3826            �           2606    140421    ticket_structures operation_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT operation_id FOREIGN KEY (operation_id) REFERENCES public.operation_templates(operation_template_id);
 H   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT operation_id;
       public       marabout    false    364    354    3868            �           2606    140517    notifications operation_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT operation_id FOREIGN KEY (operation_id) REFERENCES public.operations(operation_id);
 D   ALTER TABLE ONLY public.notifications DROP CONSTRAINT operation_id;
       public       marabout    false    3826    294    377            �           2606    140619     sequence_operations operation_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.sequence_operations
    ADD CONSTRAINT operation_id FOREIGN KEY (operation_id) REFERENCES public.operations(operation_id);
 J   ALTER TABLE ONLY public.sequence_operations DROP CONSTRAINT operation_id;
       public       marabout    false    3826    294    379            �           2606    123798 1   article_operation_templates operation_template_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.article_operation_templates
    ADD CONSTRAINT operation_template_id FOREIGN KEY (operation_template_id) REFERENCES public.operation_templates(operation_template_id);
 [   ALTER TABLE ONLY public.article_operation_templates DROP CONSTRAINT operation_template_id;
       public       marabout    false    3868    354    356            �           2606    140376    sequences operation_template_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.sequences
    ADD CONSTRAINT operation_template_id FOREIGN KEY (operation_template_id) REFERENCES public.operation_templates(operation_template_id);
 I   ALTER TABLE ONLY public.sequences DROP CONSTRAINT operation_template_id;
       public       marabout    false    354    3868    369            i           2606    83075 3   operator_events operator_events_references_employee    FK CONSTRAINT     �   ALTER TABLE ONLY public.operator_events
    ADD CONSTRAINT operator_events_references_employee FOREIGN KEY (employee_id) REFERENCES public.employees(emp_id);
 ]   ALTER TABLE ONLY public.operator_events DROP CONSTRAINT operator_events_references_employee;
       public       marabout    false    3736    258    209            h           2606    83018 .   operator_events operator_events_references_job    FK CONSTRAINT     �   ALTER TABLE ONLY public.operator_events
    ADD CONSTRAINT operator_events_references_job FOREIGN KEY (job_id) REFERENCES public.jobs(job_id);
 X   ALTER TABLE ONLY public.operator_events DROP CONSTRAINT operator_events_references_job;
       public       marabout    false    207    258    3734            g           2606    83012 2   operator_events operator_events_references_machine    FK CONSTRAINT     �   ALTER TABLE ONLY public.operator_events
    ADD CONSTRAINT operator_events_references_machine FOREIGN KEY (machine_id) REFERENCES public.machines(machine_id);
 \   ALTER TABLE ONLY public.operator_events DROP CONSTRAINT operator_events_references_machine;
       public       marabout    false    258    205    3732            f           2606    83006 1   operator_events operator_evt_references_eventsops    FK CONSTRAINT     �   ALTER TABLE ONLY public.operator_events
    ADD CONSTRAINT operator_evt_references_eventsops FOREIGN KEY (event_op_id) REFERENCES public.events_ops(id_event_op);
 [   ALTER TABLE ONLY public.operator_events DROP CONSTRAINT operator_evt_references_eventsops;
       public       marabout    false    3794    260    258            �           2606    83850    gpdworks opid    FK CONSTRAINT     x   ALTER TABLE ONLY public.gpdworks
    ADD CONSTRAINT opid FOREIGN KEY (opid) REFERENCES public.operations(operation_id);
 7   ALTER TABLE ONLY public.gpdworks DROP CONSTRAINT opid;
       public       marabout    false    3826    294    290            �           2606    83979    romboldtxts order_id    FK CONSTRAINT     {   ALTER TABLE ONLY public.romboldtxts
    ADD CONSTRAINT order_id FOREIGN KEY (order_id) REFERENCES public.orders(order_id);
 >   ALTER TABLE ONLY public.romboldtxts DROP CONSTRAINT order_id;
       public       marabout    false    305    300    3832            s           2606    123743    bundles order_id    FK CONSTRAINT     w   ALTER TABLE ONLY public.bundles
    ADD CONSTRAINT order_id FOREIGN KEY (order_id) REFERENCES public.orders(order_id);
 :   ALTER TABLE ONLY public.bundles DROP CONSTRAINT order_id;
       public       marabout    false    3832    300    272            �           2606    140396    ticket_structures order_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT order_id FOREIGN KEY (order_id) REFERENCES public.orders(order_id);
 D   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT order_id;
       public       marabout    false    300    364    3832            �           2606    83855    gpdworks orderid    FK CONSTRAINT     v   ALTER TABLE ONLY public.gpdworks
    ADD CONSTRAINT orderid FOREIGN KEY (orderid) REFERENCES public.orders(order_id);
 :   ALTER TABLE ONLY public.gpdworks DROP CONSTRAINT orderid;
       public       marabout    false    300    290    3832            �           2606    123749    operation_groupes ordre_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.operation_groupes
    ADD CONSTRAINT ordre_id FOREIGN KEY (order_id) REFERENCES public.orders(order_id);
 D   ALTER TABLE ONLY public.operation_groupes DROP CONSTRAINT ordre_id;
       public       marabout    false    3832    300    296            �           2606    140386    ticket_structures owner_id    FK CONSTRAINT        ALTER TABLE ONLY public.ticket_structures
    ADD CONSTRAINT owner_id FOREIGN KEY (owner_id) REFERENCES public.users(user_id);
 D   ALTER TABLE ONLY public.ticket_structures DROP CONSTRAINT owner_id;
       public       marabout    false    3764    364    229            �           2606    140406    ticket_feeds owner_id    FK CONSTRAINT     z   ALTER TABLE ONLY public.ticket_feeds
    ADD CONSTRAINT owner_id FOREIGN KEY (owner_id) REFERENCES public.users(user_id);
 ?   ALTER TABLE ONLY public.ticket_feeds DROP CONSTRAINT owner_id;
       public       marabout    false    3764    366    229            �           2606    140713    maintenance_tasks owner_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_tasks
    ADD CONSTRAINT owner_id FOREIGN KEY (owner_id) REFERENCES public.employees(emp_id);
 D   ALTER TABLE ONLY public.maintenance_tasks DROP CONSTRAINT owner_id;
       public       marabout    false    383    209    3736            �           2606    140426    sequences parent_sequence    FK CONSTRAINT     �   ALTER TABLE ONLY public.sequences
    ADD CONSTRAINT parent_sequence FOREIGN KEY (parent_sequence) REFERENCES public.sequences(sequence_id);
 C   ALTER TABLE ONLY public.sequences DROP CONSTRAINT parent_sequence;
       public       marabout    false    369    3887    369            �           2606    140564    sequences picture_id    FK CONSTRAINT     |   ALTER TABLE ONLY public.sequences
    ADD CONSTRAINT picture_id FOREIGN KEY (picture_id) REFERENCES public.efiles(file_id);
 >   ALTER TABLE ONLY public.sequences DROP CONSTRAINT picture_id;
       public       marabout    false    369    246    3774            e           2606    82871 &   printers printer_configuration_file_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.printers
    ADD CONSTRAINT printer_configuration_file_id FOREIGN KEY (printer_configuration_file_id) REFERENCES public.efiles(file_id);
 P   ALTER TABLE ONLY public.printers DROP CONSTRAINT printer_configuration_file_id;
       public       marabout    false    256    3774    246            r           2606    83886    bundles printer_id    FK CONSTRAINT        ALTER TABLE ONLY public.bundles
    ADD CONSTRAINT printer_id FOREIGN KEY (printer_id) REFERENCES public.printers(printer_id);
 <   ALTER TABLE ONLY public.bundles DROP CONSTRAINT printer_id;
       public       marabout    false    272    256    3786            _           2606    74616    users profile_id    FK CONSTRAINT     }   ALTER TABLE ONLY public.users
    ADD CONSTRAINT profile_id FOREIGN KEY (profile_id) REFERENCES public.profiles(profile_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT profile_id;
       public       marabout    false    232    3766    229            M           2606    82832    employees profile_image_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT profile_image_id FOREIGN KEY (profile_image_id) REFERENCES public.efiles(file_id);
 D   ALTER TABLE ONLY public.employees DROP CONSTRAINT profile_image_id;
       public       marabout    false    209    3774    246            �           2606    140707    maintenance_feeds repared_by    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_feeds
    ADD CONSTRAINT repared_by FOREIGN KEY (repared_by) REFERENCES public.employees(emp_id);
 F   ALTER TABLE ONLY public.maintenance_feeds DROP CONSTRAINT repared_by;
       public       marabout    false    385    3736    209            �           2606    173934    maintenance_tasks repared_by    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_tasks
    ADD CONSTRAINT repared_by FOREIGN KEY (repared_by) REFERENCES public.employees(emp_id);
 F   ALTER TABLE ONLY public.maintenance_tasks DROP CONSTRAINT repared_by;
       public       marabout    false    3736    383    209            Q           2606    74713    lines site_id    FK CONSTRAINT     q   ALTER TABLE ONLY public.lines
    ADD CONSTRAINT site_id FOREIGN KEY (site_id) REFERENCES public.sites(site_id);
 7   ALTER TABLE ONLY public.lines DROP CONSTRAINT site_id;
       public       marabout    false    3726    199    219            Z           2606    74761    gateways site_id    FK CONSTRAINT     t   ALTER TABLE ONLY public.gateways
    ADD CONSTRAINT site_id FOREIGN KEY (site_id) REFERENCES public.sites(site_id);
 :   ALTER TABLE ONLY public.gateways DROP CONSTRAINT site_id;
       public       marabout    false    3726    223    199            W           2606    74801    boxes site_id    FK CONSTRAINT     q   ALTER TABLE ONLY public.boxes
    ADD CONSTRAINT site_id FOREIGN KEY (site_id) REFERENCES public.sites(site_id);
 7   ALTER TABLE ONLY public.boxes DROP CONSTRAINT site_id;
       public       marabout    false    3726    222    199            �           2606    91056    skill_employees skill_id    FK CONSTRAINT        ALTER TABLE ONLY public.skill_employees
    ADD CONSTRAINT skill_id FOREIGN KEY (skill_id) REFERENCES public.skills(skill_id);
 B   ALTER TABLE ONLY public.skill_employees DROP CONSTRAINT skill_id;
       public       marabout    false    3860    348    346            J           2606    74730    machines sm_id    FK CONSTRAINT     x   ALTER TABLE ONLY public.machines
    ADD CONSTRAINT sm_id FOREIGN KEY (sm_id) REFERENCES public.status_machines(sm_id);
 8   ALTER TABLE ONLY public.machines DROP CONSTRAINT sm_id;
       public       marabout    false    236    205    3770            �           2606    164797    ticket_feeds status_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_feeds
    ADD CONSTRAINT status_id FOREIGN KEY (status_id) REFERENCES public.status_tickets(id);
 @   ALTER TABLE ONLY public.ticket_feeds DROP CONSTRAINT status_id;
       public       marabout    false    366    365    3881            �           2606    164867 '   maintenance_feeds status_maintenance_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_feeds
    ADD CONSTRAINT status_maintenance_id FOREIGN KEY (status_maintenance_id) REFERENCES public.status_maintenances(status_maintenance_id);
 Q   ALTER TABLE ONLY public.maintenance_feeds DROP CONSTRAINT status_maintenance_id;
       public       marabout    false    385    3903    384            �           2606    164740 &   ticket_feed_attachments ticket_feed_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_feed_attachments
    ADD CONSTRAINT ticket_feed_id FOREIGN KEY (ticket_feed_id) REFERENCES public.ticket_feeds(ticket_feed_id);
 P   ALTER TABLE ONLY public.ticket_feed_attachments DROP CONSTRAINT ticket_feed_id;
       public       marabout    false    366    3883    367            �           2606    164756    ticket_feeds ticket_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.ticket_feeds
    ADD CONSTRAINT ticket_id FOREIGN KEY (ticket_id) REFERENCES public.ticket_structures(id);
 @   ALTER TABLE ONLY public.ticket_feeds DROP CONSTRAINT ticket_id;
       public       marabout    false    366    3879    364            �           2606    83950    reports user_id    FK CONSTRAINT     s   ALTER TABLE ONLY public.reports
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 9   ALTER TABLE ONLY public.reports DROP CONSTRAINT user_id;
       public       marabout    false    3764    229    303            n           2606    115529    breaks usersession_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.breaks
    ADD CONSTRAINT usersession_id FOREIGN KEY (usersession_id) REFERENCES public.usersessions(usersession_id);
 ?   ALTER TABLE ONLY public.breaks DROP CONSTRAINT usersession_id;
       public       marabout    false    267    3852    327            �           2606    140702     maintenance_feeds usersession_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.maintenance_feeds
    ADD CONSTRAINT usersession_id FOREIGN KEY (usersession_id) REFERENCES public.usersessions(usersession_id);
 J   ALTER TABLE ONLY public.maintenance_feeds DROP CONSTRAINT usersession_id;
       public       marabout    false    327    385    3852            �     x�m���� ���-��.{q3�D� ήo?��up�?
4%��$4XI]v޴���l�|{��X�U����2]rI)��{��p�0���f'��*�ن�y$%P��n���(�E�����i%���C��4�Ի՜�4�H�?���9F�m�}J�dW1��b�k��3n?�Z�ubL���Ql��2�����D��a1���=ƿ��4��?E��F�&������fs�;N��u�8������-����V�2���      
   "   x�34�4�4��242L@s �Ȉ���� L��      �   �  x�mS�n�0=s��_PXv�c�� ]�(Ћ"qfȒ���痔��d0>���=>���.Nث�	>�
�
�8�֣����W�k�4/)�OA�9��T(7�|l\0�Rs��ѱg/v0o��n0��J��W��^ �0��BH�u�:��(�m�8���|rL��'8�� ����:���Vw-&�h�{+>m�LK�#EO�+��	�rd��'���T��p˭���������Vr�
,���D�q��S�ll��V�Tk���,��JTq`�&�M:o��a�=D�-;�$���њҁY�&��;3Jf��VP*��$����/��+S���:Q/�`t��!3pmg�<F��S@d�[c�c���L�-���y<�zT�x��4o$�#�}���W�ŵ���fo�)xRt�k5Q�Z��&�Q7�YG�������H$]r�!\��I�jb��UH`�I�߯v��?qF      �   %   x�3��,HU0�Q�\�&���2�0�T$W� �&q      �   �   x��N1�0��W��؉���e� R�����F���R� ��Y�-���,n�j�;�-b��[	���X�%�@0�{֌H:��"��)TqJ��bҼ|�*���?������qs��<8/� G+['Dr@������k��!+*e����:��5u�6�<ю>�             x�3�t�)MUH*-)���������� X�F      �   c   x�w�41���4��4��
H,-NUpNL;����(a�*���X�ZR��id�4�J:�&f+�q�q�q����b�@1SNS1��	�	T,F���  �       �   q  x��ZK��8\�w��@���Cd?@��a��X"�Nc�@gS.�$��(��Wl�_�����3��P>b�s��x���g�����?�����F���L"�������^�^V��=f���l*]\�2��7Ha��ix�w~EQ��H��/��5�>C���aY����%Q%N&�\�e42�dd-�Iq�>�=�eq�Ǔ�$_��D�(��ex<��4kR������ S)�䨰�`fd5�����J��<�0��^��$G�ǰ��T�RfI��LX���U��a6�Gf��>�w������:���Ú��Ȱ�$"u/:�1��5&�k߃��GLdrpd�\�X�=y�1��Q�s��߿<V�Y�#�;V���y�+�-��Afse"��L�����A��K��KP�5!���\�2�� �<Jߨ�50�h���Ƀ���Wd�缯=�:U�Od����yQL�\�I*{�����*��i{ҾI�N�'�)L���Ǻ�~�0fL֣�Ϝ��W��%�2�<��&��c�p����\��¢.2��7�I�3�1�&7�fj��%*��k�N1��⒬��:nȃ��o�' e�t�N���3�#�ilS��x��VѮS#���S�Df�l� ��M-J�2DU(.d"e�c�4�$�=|Qo��H���M�5�<�0��v16W˔�/'�J\T����K����Ճ�XM��2=�5U�.\��Ѧ=Z��,�"�ᢪ�,#W3�>.fS8� �,@03y�����V%���Wm'2L�fF�{ԑ%q�u&�����9"ך	�D�Ƀz�&9����k�Ƀk��ca��`	a���`�.]RUw9�p��@dX��(�Z:W'2�ĠGUG�"u�<9�z��^��d�	5G:�ŽPF�jd�:�/d*e�da�]\LH�<�4�4��Hw�Ӟ<�tʘ�u�L�ؑ�SG�(�7��f*��YK׳�n���},!�\d�S*},ɟZ�Ƀw*��E�`U]�.d�SjWh�̢6���T�gh
���qD�R\<�p�ԹJs�K���ȃ��W���4����tf�`�1~@�lf8t��<Ȱ�$���~���\�M`�֛9���t�mK-�y�a�W��d|b).���Fq�L��	�2��� #��{nd�s�\&U/T���ȃ�8iw�d(,���̓���&+&�l��̓�����h5X�Վ�<��1�����~no�f�{]3�Ĳ3�r褧��2���v-��[������<�������[,���G4|�-�����`9�u]�:�]O�6�����<�0x{�61il[��ͣ�Wr���f�u?.u�����v�_�o6�;�){󤭊�i"w�=��υU��/����b����<g�<�0|��)*u�U�V���۫c����i�h�̪�U`���I�?�9:=f�����N�|�ؒ]Uk��:�֢ܞ�t��ƶ�<�������Z\�rvXYz��>��9۷���;��G�o�[�̀ܲ�����v7�:�:���s��0��Of��zf��f1+�f�7;&Y}���Vl��ng�u�o�l\F҉�u�LLC���7��J:�l�9�n����ՙ��quI�N�Cj��0}�����$<1t��㽛� 8���#ɽY�v�G�6�4$�Ժ�#<�:�ģ�u닍|�:S�M0�ʣ����Of����1F�G�F�fmR�ß0������	�l{4K�5}�QgP�[��(���#�ă�ئ���T<O��ڇ;������ج; �,=�e3�6�c�:�ͱY��Ӭ<����ͮ�G��f�n�Ïk��hf�i�ʹ#���g�w��渜�̗�[�O'u�c���S�\π>���wy��cl�2���2�Wʉ�������/a��      �      x�31�44��!C�H�=... .S�      �   �   x���M� �~��@�S�r�
����.�������>}��� ��< ���#v-�"���fc� ]���ܿC��{@�.��8��M������8�����]�؀�eBs���eίG�l��?�ϨB��i��p��I�a��M�D8�x�q�y"G���<ωd�<LZ�?>��Vgv%��H�0n��&��A'��N      �   e   x�]�A�0���1J��w���b4�6���&�j`��=#�̕��y��Sӧe�Zc���|��ӎ]*��@[𴃲ycW	k{�1p�J)�L*�      �   L  x���I��8Eי���`Lt�������SRJd�)&�����YI������ ��!���_$�������@�G��|�,b���������r,*P='�s��B^4.�a~&��o�8~��������������������Y�=SL����d\(�މi^B�6����89�:N��c�hg�!.��9�?4q}������+������n��8"�ŗ�h�8��m�L���Hr��#nw6��282�(���|����� ��r�;9*�8����@>�wM��6�5��'��f��[NF,!]m�?<ʟ(��L��eaYy[��Q\� � h����boCpFq���9�}=85k!{/�|xݧ�!�ҥ�]�Ih�!2�L6Oh��3)R��Ӥ�1:M������&�s��d�^P޿6��m�Y�9ߍk��y�C���re!���#�.]Lg�M�i�������~&[��M���d��	o�WI'�+�&��I�p�g�L���9�ǆ�|��4�w��}�j�6E��B���S7���������4����Ɗ8m�Ь-W�mk[:|���P��{"����fk]�Q�)zE���q�ѻ��n�jc�	G�}���i��0�fD�5�9�$�AW�cm�irA��W�؎N��6��fZM+{�ß+�1��I�E��W���������iz�cj������/��>2�OrS�n��Z�߾��~���yZֱ"���G�ni���ɿ0�?��CN�},���j���m��`3���Ʊ4m�88F"���ҳ��ݰ�Ei������ad���W�au�j�'�ܶ�[��/[�лu�<hҩ_����r#��֔��e�Mݠq����Gϙ4旦��R�}p�Տ��'y��d��R���4�a�s��4}�U���&�焆�\��I^���0�S��&_�8���%׶|��ZA���|�{�������av��J��0	v n@�3I����Д����pr�p��pU�{Vfg��UN������>��n+=����7�Q�4E����́�����4�&��f='�ר˴ 욹���n��~��}c��E�s��Ͽ�\�C�׿�Lq_Iʴl�����\׎��@+��i����#�^s\dk7��JB�������n*��?��a��=�!Y��l�&~�r�F6��"e��R�)P70o6��l)MA����j���d��R�L}�a!�@�E��e��/MUo��0�L��$?ɖ��i�n�{�~M��d7(�l~��@I[䶲�Ⱥ�������:��?~<9�8��������OzN98n �0�7M��V��y*.9謒�k���|>���w_      �      x������ � �      �   0   x�3070015�4p46��!CSSsC#3#��	g$W� �I	n      �      x������ � �      k     x�}OKn�0]����.�@Vݴ���BRa��|��ͧ�Uj,�y3�3<���1�[�uZ@�R5�ۻ��M*�QN��I`E��B-�k+���YY{��"��q��r��]��ׄs�����f��7�}����b��H�ǺS?���U������pob��r5�Hm2K����S+��u��k�(+w��nב�W��$� >s�N��z<�����yy8ֹ;ԋv01�m�*O&�CD��X�Bj�Sz���iqE��U�c!��A��OMރ�ݍ��$.Y�$?�E��         �
  x�mX[s�H}��
�>%U��&x�a�x��^���BCF�����{���Ů������N�����MQ��zcz�Ԥ^��FQo�M��vf�� QGmmH�|g��Qo�qo3,�B�T������r����7V]���+�|���T;�Mx�N=��XΡ�cM���"�a��6��YjQ�*J�2^_���5,�,��W�6��`/Yա�:��*��]wYv��ԟB�� ��L�tq�>;Y�&�S�,��YQ��Δ� ?��`yo�#�G,7Y6���|e�1�nXjCrG���>�C�*�B�M��>��g����a�-��T�W����~��k��E���Ҁ��z�e0+2�����ةW�Q��ڀ�Δ�8�|g��ۭ��T;��;ӌ�n�W��Cv�P���K^�KU�W�>��*����*,���!++�@}��F�긱����F��Y�Ӏ�ѬA�+�f��5�!�t��n�i��4�P��0��WМS�l� ��Zz�}���S��̖R�MԎR�h��d�$Wz��8`ך!$��@���p�/�z��E�y���|��݄������q����G�P6sv�o,څ�V�KWAz��P��)4ʻ݁��������O�n��>Y4pp��5�̶��-�f��8����ࡳ����삏�Fn��:�����x��Ç�q�k4��Q�'���k�0[���\��:���lʐ�m7��1�ȴ�4�Vh(G#]�E���T҈#�n�(��ɞeG�io�4�Y)ԦA�'�ɵ�	O�v�F(Zyľ��4*J�3c���hT�=��;,���ʞ8�o�>G�%P|�1{ֱ�Y��1�6hl~��aB.�1��-;�o5�ٌ�Q�#���p��6��9���e�� ��~5���c�nZZ��δ������Q�s��͕vi�6h�	wO�I�q���\�D[�g�өCv�3En�� �rkv�41��7M��N�&Nk88a;m}&|{'d�t�D��C$Yg�:�P̪.��4����X(� c©���
��L.�.l��{�۸���QEy]�Z��r.�n��
Í���6M�ro��)mw6W�{�i���4ER�D���[u;0%4%��Bkj��]��r ����e�>��M�{5�V9�㙦K��?u�m��n&(Tk�Lb�-El�h}�̆�j��u%F?Ή��4���y�O�	��BH�;F���j�+�f&�Z�B��h�|�ѬT@ x}�䦾�� �u��X��h����;��7��x�V��իz:Ϙ��:?����ƙ"Ns���EC_}����L��|��4�Ft����&1�ϫ�ͅ3 ��g�?�z�<��B�_7��0�EOv6��dp^�En�B�4��}Q��(ly�����f�(ޠ�(נ��&���>±x���1K��kXHL��<TB��`���WP+����?R[e)���!��C4cB傇joQGϿE,��9���{Ul���DL R��$����\��� ��<cZE�=48!u��x�P$��#劃ʲ�.����8p@��I)7ٍ
�P��$���Eg�\�8�d+϶,5=�[`���l�D��f�|_]c��H���/8c�3C�l����T$�&a��g"wYf��� �z�K��Ϻc]�Iu�D [��p>��<��{��|�z9r6�:��#�'�ҟjC�EK	�}�O*��� ~�S|�����e��`RPO��/�K0P��Z�� }V?j%ce)����N���R�п4{�h)��E��H9��-=io3�}������G������D �=BF�?�8�H���ѭ�
��'�̉����1�(�R�C�W�G
|N��NF�(�\�c�vbK�A bu�C�CrA�X��}<�Kw����%`1�9�p��X� 6�VC%	@s��G,)��p��#���7 =^����X�\��������;]�#�Nn��٣tҝ	 ��={��,���������R��R��H��Dl�{�ܔe!����W���E���%����� ��3W}��c��߲6�U��{����	���N��z��t��>rK��X:����5 &���!Q���T����!�&F�q$!���c�o����=hi��w�',4F%��:HA�G�:�(��
�e�1O|�\4u�ȋ7������z�$�EH�F�9�<A�;^@��m���p��z-´{1��o�$r
n��M<�"�t&X��	���Ɋq>�Odx�a���sw��s�*�0��;o$!g���H^�I���;d"yAb�<�A&�S��!Ey��Q$g�{��� ��K�"U�yR�������w�l	�凹̄���]��U	t�r�8�R��"=(�E*�a�Ͼ�A�D�d#�x���xЈ�>iB�D<"��DI%XD�`���K�F�a�� �"E?3��KQ�!����R�<����wG~f �`����-ޓ�r���'�
)�Qk��i�Ǻ��X2�z�_J4����.q�T�����Z��pY���w�_
����K+�1����u�mUfg��u%�4BZ�J&���ӡ��F_2��܀s�U�'FEk�fu��5��CF���TsMk�� �Jk	'��ڠU��*��XBk��ǟV_�����	��1>�㪬Py�cYj�=ׄ��@Iŀ�<h���I!=�wۣ�
��h��y���%����>}�?k֑�      �      x���]o$9r�����/|a_('I�t��8��0l�X�����ȫ��H�u�w33����"�h`z��)�$A2A����_�o��÷�_?�������ߞ�>������u���͘>jw��f����/�߇��}�����O߿=>�}���I����ݯ�?ѧ��/�_��t3��>��ֹ[k�Aҕ�����!��hoM,8IG����dh���-��-�ʄq�c/��I5�Hb��h�`��#�eH���@����-�[|���#�gH�ҷ@�tk�`c�t��>���P�'W0 C
 ��D6A��	�U&h��{`�w���l�b7�L� �b�&Q�I����!c7�X�n��uq�!I�2��;uk�T��@�fDk�A���;uk�T����F#�8��#dbȔ�����,E*P��ɜ`X�Ի �Z�����T���hF��"�e;����!��/�~���}�����������o�o7�o/�w_?萢�'00�3�:3��%�<��]��C"��n�d�I̓�x�<�l��/��jn2���/O:3�&;f�i��t��fԽ���JHm��IW���3�n4;ō�7��@�����GEL���q��#&7�����G����୓t���e��'U6�i�̶_����!{��'�BFZ��m{/���{����X�T�p��S�t��>i�![k���-�!Y�t�d#d�t|����vw��z�
�vB���������_�?k�N��Gw���	��u�֒�p�Xl�c�;���-�J㒤+��`���?t�Fga��+�Y9~���Ҵ{??����M-ί��+����iZ������w�i���<䢭�(���H�!$�t�p������1p��z��I��V;�sF@�3Zn�=��#%���_VɐK/�N��qHNK:bp��=��p<ư8WM��l���{p����ƭ	���t�Ќ��1J+�c�p:�>��R�6�J�󩘷?�IGLh�x��`����hd�༗t�䑖�ͨR�*f�1�ǈ�I:B���W�=�ei?@z��c��,�t�2@�S'��I՘6�ţ۾M��2f��<������$�L���^hyR=&N�p���#f`Lq 5c��f$�9�m�d1c�B˓*1�-�[��uV��6�[�����O/����_>߿N�����Ap>�FW|��Y��_�wp�>z#�
��D�L���������=������
4�����&Sc�]HN��M���Ռ�dj���c����_?ua�]�ћ8�JGHǐ�=l�,�C9n����H:Br$�w����H}'��� ���Ąn��P�'Ü��n^t��HL��	���%����H[��C��.��� &.�IGH��5C��!dx~����l~b7�����@`��`��͏�q�Ye~�Xj�4�"IGHn�ح�cmcOߔW-!H�2<�0�[s�b ��i�$!����k3d}sS�h1Z'��gQ�ϻ��El�����$!Ϳ������ӗ����ӏ���<�|�{{�y�嗇��_�?�z��6�~{�����������!��N��7:G M�|�$�o��J���2ŵ�OFc�0�mX�ueyk��m��2� ����`��#ǣFX6�?����C
�.���{�h%�x��{M<9\Ov4i�:I���7uͶ��x��?��K:q�iq�ҺY�K��x'���i��b���ܒ�׺}yR=f>E� #$o@�^3��Ig�������6(˺�s�K(��tzyR%$P�[���XGHގ5����JH:�	{����m�5�ijn���$��Znnۭ�mSs���~H���#$!��4��=�0B-��Aw��-ˣ����ؙ,�k�����+ˋ%�O���j�0V:�!�]�vѕ哱6�OA�G_0<-�F$1c��u�}��,M��S*S�Gл����򞩝7M�^V�/�,Z���"�Ԉ�q��r��aPW��]Y^�X߹��?9�K�}qbf��+��?;/ڪ¨�n#�Q�nڂ� ���F>��S���MqHM�.:�Ⓥ��ܵ�q�j�,u���ʨi�c��t�dϝ�y�T빧8��g�vQ�YV�Ǖa�u\����$N� !C���b�� �f�j��A8����Y�T�9�+������Y�T�h�K�Z�32f���<�j��[�b{�%]���S�0V��A��@ҕ��?��rL7��]6g0�'�b������I�2� ���{m~.O�l�)9�#��û�4laL��0�d�������t>�:�'}�t�d;$�4c6١��c��$���&~Zm��_�}���Z�b���-żZB
����lP�-�W����s�C��P�JGHށ�ݲA}U�����NGH�
�nQ!_⸮&�<z�teG�B��P�?�0yeGI�����#$G�B��P��
M��4��O��te�����r�����p�qy�l:_�ɣ;v����r^���mY##nyY��X�꽤ϒ�vQ���f�[�w�$�a�/m\ ']>�mR�.Y<�-B:GgtL��YGH����f��.9��Z=��>���Ϝ��#����>�N��>�s���,�S��i�9�E���:E��v��˖��v:��ppdt5i��ڤ]m��&IG �NYV�wO����g#ѥ��ڥє�p97�yn�~V��|�?�Ƣ�e�U@���KI���T�qT>��
" �lCC�#�#yI��l
��)yviË����{��'UB7e�n㾬+k�mM����ZH��ǕW���{��[��i���v�5�b�����ܦ[?�>&qr
��:;]Q"����<�3�\�$�t�#&��-�Ƹj�_��� �%�.:B�����?tqX��*�]j�+>:9�w�<�!�7h_�3v�O`=M�|d���yr~�qƕ���
��OCotœ�yf~!8�P�QF�HSy -�SE���k.7���#B�Ϩ��+�!ͫ��a�cBG���ݐuū�yis�O#��T��h~ ��8vNk��0���qG�>N��p�/��������,��Z|
�����w�w���r*�q�!��S�6*ƀ^)��+>Ü���
�\��Y(%��;IW�N~G7��#���&1E�1g��tŇ���'�퀫���/�#�w��[Zd���y	?�˹�Uq��AA�0D$]q
�7\R�)�D:���dѕfo�����]9���c,-��󒎐�!�v����,�-Og�J����+�G"�|���Uu�܃ܬ���0^ҕ�c�z>K�h�X�g��w�0��%Y����OgY�3]��ĕ𩭝�,�,�Nr��Q�Rw�`�[�f�hXGH��˹�͐���3��층�#$�DH3d���9S�VEC�A����N�YYMx�ɱ���s;!#C�:����0��-YAF�Ĉ�v�t1�_Ft�S�܎qѕ�s5Z>W�
Y<W#CRN�0���^t�d�,��7CVf�0�N�8�$!�bw;V���0��!���^t���+���J_fJ���4��k!���g�!����mA���M��v]�Ѿ��Wo!I:B���VDT�]��qcr������Y�o(.8��h$!��tK�ui`�h)j�t�9����Ut]\e���������ZW�k�j���/_t�R�{��h��(�W�d� K�C�K�M :���޾+��}�1�;�/]8��tdb�%o�j���Sm��+�5u��􇻷��ݽ�������ק�}��7���͗�(!��&��s�ً�,D�����e��]t�l{>����a���]���&�-�>���ٰNґ���\���-*�	��v%�Ø
��l��$��%�}Ȁ�&qw�#[�9���2�l��A��rh��^"��Js�dݭd��+�<�����>2"������^W,.t2F����ESh"0�Kv�N13��5%%��a7�u��TG��sm軿��{���"׺XK������z��TW���QBpcnD�<�s#&���:R�e�~x������/��G�Oҟ�1��ׇ�|��ώ��    ��2%
o���j=��F:Օ�e�4����Ӈ�?>��Ǘo÷�׷�wO�>??>�&�����g俭���]�苤tv��N���l_mմ�f�S,mB/48���ɺ�\I?u�,�dJK�m�t���8~�e ��F�tR��|�u���ݬ4�[�)��^�Q���4t۪�ڭ�ݚ��#$�n�U�[5�I��FGH���m�j�j�\���98AVT�qyp���ݨ�,�*)�*ڸ��[�m�j7j&�|�A��#$��Q�5�Ҟ��9���(銆����3��q�q��G8�ٽ��:�<�Ճ[9Ց�}��at��?;#��L�4���7R�_X%Nu�{�� �<C�vL�y\�_ؑ�^%:���*�$y�a8��^!�1!�]��k���B@z�^��Nx&y�7�f�z?}o����i�	8{��)�ᅷ)�. AF��.�)��*+y�<Ց�M�s�c�U�U/�k���:ﲢRg˓�4���#�U:�kё���\���'�Z��������;Ϣ#[f��̣A#����S��&QP������������b�g�zs�2˽� ����%]iϖٳeF��G�G<�^�E�l��X��{(ߎ.֑�-���-��(��z-��Öٿ[�u�1��)(��3��M�.Qґ�m���m���s(*m��J�U��ê������U����|�]�$y�:��s�.�`���~�6J:�}�Ӎd���7�O�>>���ۙ;̖�(�a�����"����3����|u7~��?>�V�~7����C��7�G�P�[�
hHHt���=-:"���1�k�������c~���?|�?�6�^�~����C*K��Ȯw]m��M�O"���S�VԒ�4_����f�����ᇁO_�_������ߛ��a/���?n���|y~��_����������Uc�[�����5Fw:�;z����Sݹ���J��z;��ͣ/�\�i;z��#����~��x������>��k��wZ�������ru�x��Y�H��"��|,�t8�/�����#�K��Ⱥ�|����'�������Uo;y�_���\s�I�#���YG(v�_���R���v݈'芲R�o^O����ٽ�P��l��T�w�1I:�+	q�S��P��B�l��׍��v�gё��DH�S�b�Ճ��˟Nu��N��c�,VD���tPH�M8Ց�m|\m�D|=)��G��_�!��{4�t�a��Z]w-�
ƚ��m#���l׻Ց�uud&�(oYi.P�c�m�b�Z9a�p�`w	+��4���nכ��MV0�{Z��-Z�v�x]����^-Ȉ�F����ğ�h��^}܎�EV��Lu]5��b5��@f&�݋\t�ds��3���ʍ)Wqtۡͺ�\�Xw��F��e3��\�' �J:B��<*l�v���2+���C� �H�fR.���*�d��;�IF���d�k�tݵ@Ո�\C$�t��i�\3��!C2�q�a�ey����]]w�.��|��	2"���V�Z��^X-.VWQ�t�dg#��Y{�|��T B���ue8���u�[˪�OEHkh�`;dXGH.*_]���l ׄvC�;�EGH.�)o�lp6��}�a� ��U��ە�!&�ҡz�q7pXGH�\�[R��N��`rŊ�5����\j��&���&]��;�Q���1����k�.��@_L�\��
2�p�����38����^��f�I�ѕ�v����!7p+�3-?tw��Z����JW�3e�SP�(PU(w@��gŚ��̅7�M�q2o�<�5V�����5@הƦ�
��������5� ]��dr��\~0!J�2�ي��7j�߹v�v���N27��W:Ҳ��P��.�U��r}H�-:���5�^_a��]��>����m�����
[?g��!#���^�X{}������qt�$�،�3��0��ŎN�9g$�،�3��0���9�-��Zte8�?U �k�8�{!�༕tb�i�V���טM�`�{���ue8��̹��.��4\~�yu�x�#�Fdܜ������|��eJ��!$����>��]�b��J';�u�2@�A��!I:�5�K�O�r�m�IG\������tJ����'������v����������ؑ�xdǙ�C�@���1J:b��=�"��2�޹07��^�)f�7:��("_fn�IK:b�5���6n��r���;��usv\S���p��xjjO'���pk��#$Ͼ������S�q�֋�S]N=�O�l,?}�{�����ۧ��?���9
�݂���nl�C�c�����TG:�3�ƺ��^@��\^�2��Ǳp��s�r�$��]mt�c�c�t����*
���TG:v1�_A�/��*C���H�ņ+��s�2��.?Z����Hǎ��+�b3]�͗O ^ҕ�X�t]���M	��I�2���.�����3t�V�wt��g��+��C�t�
+%$��S���=�tj��I:ұ��+<4{��n��撤#�
��W@�� 
Ga��f�TG:�p���f_A�1�ՙ���t�+�
_;���sIg$]�n�OW�5�
��[�>n[�u�c_W�
h�D����Q⍎t�+�
_;�(|���{IW�S^���t��WЁ��6� m��HǾ�]�+\����>F���;֕�tX�t�%�b���|��pz,~���_�l���
֑�}�{����F�[<w���eK7��sͳ����#{��tYD	)E}6!��eK	b&.�a��AG��
��������te8}?]A�� �?�k˕�t�������|d�'�.���+��k����!]V��$[��7SoK[9��8>J�5�\5�^�\,�/]�LA*�1�(�
8 rM�f�bq��\�n4^�pX
䪨͘�׏e�[��ђ���U`��p_��z�����d15c�{�͘��dL���!�V��/��o�kƬ��-�h�՚��I��2f�Q��M��I�6�&�Ÿ�\t��������0:g���t�t��\4�A:Na$]G��}�P}_�C�p��f!���^g��X�U��|Ū�����|��p��U��&�E�����
8�n����/'�HSZY��@��BCp�tX���IGLv<݂pP�[`��s��߬+� t�C�M�@h��d�^��ݎ�N3f��#L4�)�ˁ\/�����!*����
8>�}�͘ū'eL�e�Cؾ�EFH�;V�;͐%�s���)I:b���<���<i��x�`%]�����md��`��}�d!��ԕ�����b;-��Y/yNu���mk�,V�=�h����1J���\Ӷ�~ɓ�;X�v�����{䪶͘��������L��}O���PW�v��Q�c�u���m�l�=�J��w�:b���V��j�2��uv�s�EV�A?�+�6��F������u�d�#׶mƬ�rKsm9þ�g!��@��b��#HG[A�s��}t[��az�q	$]����
�b}\y�DJt�H:B��q�|O�h�ѻL9S+���#&��+/��t�w����D����y\7�S,�+B:���ߵ�������V$ʈ�=�v�YGH�:���)Fe�0]��{�����w\���b��CH��2"��q�V;Ų�b��h\08�����s\��N�����<�VK:B��q�<N���h%3���v�t|9�؊Y>a�� ��5��#&��m��XXn�HS���W�����)��!m��q�����K���).�w�|Y� ##��m�S,&|�)uv.a3[[��N�ws:��b{O�c�߶7��N�ws:���\O-��B�#$��m�㛖:ǘ!�Mg1���^WG-O�;DC�/yIGJ�<�W���j�|���w�r�p�a�ԫ_�����댤#$�����z�Cg�4���5����vB�M�в�6�����Z�u�d��9�bb�[�!͠M�t�d��V;U�E�sD	װ^ґ�=O��yB�� �  �ap}h��#${����z�C;-�n���+����y�b�bq�L8�jp%̬#&{��m�S�e,�˩�lYE@v:��r�X���=:ڳH��۵���C��u�5��c�k�EGH�:���)B�!�&^\l[IGH�:r��/�A>j�D�A���N�J�PW	y�۾k!��t��u���8�t��+�Z� �Bnn�C�c�0j��K�]�<�[p'�wf�8��K��`���nm�~�m**L�h@�t�d�ӭ�4�U�^�X4�[k�:B�穫-]Y� a�HY*0+�
��4����,��!5yjm�f�u\[��ҭC�X[�`��ưmp��=�\]����X��5���"#$���t3d�q6�ʆak-YGL�<ry�f̖�6��ޚ��	:b��L7c6��	Cһ6_t�d�#��n�l�=t#�m�u�d�ӭ�4��^�8��t�.YGH�=r���w�r��ptN��-(XGL�>݊MC]�i�1��\d�Դ�Vj�Օ�f*�7�v;�d!5C�Z�R�������;�k!C�
�R�kwz�q�#�e�^+WWjz�ѿ� ��������+��G����o�6�d�t���,Oj��h$1=c��g[�T���|���:B���9��˓6�R�W��\n�m�u�5~��*<&o�[�}V�21d�����W�)�I��g]9�W��z�r��p-�L�����w�њn4�\�[`�d�#̒߁@�JN)�.'Ru�$��qik7�A�����,Fɳ���y6�v�GM�-`�q�+���S=F�w`�R�2x1�y�^�e˓ΎR�)ȡ�UZ�FGHv�*DS3Ju�yF�L�(ںJn9���=���U���J�1�J�زq0A����N.<��ؕ�csAKM�Un�������\v���o�0&W�Vҕ�N.:�Y�T�a�!� ]9.9����Œ"$�(���%IGHvF�������?�!���0�G���z��M>��:��ѕ�N.)���*$�)�����t�d�a�F�b@�k�Y���F���Ɯ�_�Qr�*G�������L�*���/b��5��ޤU��FW���������×���7Y�����v�o�j�8~5�����ӷǻ��T��D����`ף�TG*6�&LÅ�����ʣ+�Di�Φ���^��ͺ�'8�,O,��Huav8t�ttx5�����k8��a�c�9��ni���ѕ�$}�t����,?�Łq۾3m�K/��AG6�V������O�8�i6A�v���k����t�a�l��������c���c	�#�,t6:���V��@��;�f4�3Q*��Fݝ�l�m�.���.Ǌ4�����V��[�b
�P�L�Z����p�xW��8�6��3w:b�Y�ˁ�Y's��넉��*Vؼ̕��l���(�N�2ݨ4X%)وw˂wuY��(���.�ӕ�,x'g��B��EH������7�:B���s�[ۻ�/�7U�����u�d7 ��7S��2e�-� �NW�3�]�xW��06_�@uA���#$��9o=?��,G�{X�����S�9$/����cNL��)�9���pt5��qU�c�#;���\�u�|D���c&��4�پ��]�6a�~C��xŹӕ�t�4<|~����oO�7���������??�~|��UΟ^o~����2r>���|zv�������_�_�y����AG+���x'�����b�5�z�t���|����P�a�B�N�r����������O��g��	�|G7q������V��Va�/�$Z����+�Y�N�2o�����38K�Ǽ�0'������7��/�_����?����症�G\i~���^���v������|yx�A��?�'=����\��ׇ/��?�'m4.1]�bCNR�KI���#6[|�K�p6:���']9�Fw�~uQL7/�.|N��f�duq�#;�9K�
��|8�pT�ͮ�婎���<D4�o�+�*�bN�c��F�A��NGJ�s*x�S/����z�m@����IW���ݜ�]�Q2�"�m@g��+�i�nN��(&~�.�_�~M�NW�3�ݜ]�Q��2F�IŦm���<�w��!�~����34���8��F[�"�ц����4�iR;M���4�BЉC;]9�'wsx]��BEʱ'����{�9ѻ��41��Ym`�t�`���-1�dr��KD�~�7��'};_o��Y�E;WrD��z�2B�ݟS���+fo�4��*��Wd�#�w�<�]1I[��6�ࣝ�#�y�<�]1[��t�͘͢+ǹ�nΠn�)&]��8c�t����*�DS<{#�P�g��߰�4���&���&���R�#[�9������/��YlZ�n��H�FwNqn�)n�4&_}����u�a�;�27�m�H�֓1J:Ұ	�s��h����&T�IБ�mqh���|f��N��74��4l�C�-.�-�4Sq=��~�#���n��9�2M�Cե͢+��.���b*�L�r�q���EW�S�]l��Ŝ�#�|������4l�c�-.&�4.����ӑ�mql���b��Rˆ���#���n����2�����#�u�8Y��v[\�
>���[S���8�[�b�̒׌���̢#[��n���2з��{5��4l�c�%.��р�+�L:Ұ%�햸��+��r�mg7�+�9�.�[�br�L㩳ڴ�Ĭ+�ɹ.�[�b�L�oN$i��vK\L��i���~�u�aK��-q1�V�)}v�FK�r�S�R�%.&��49+ď ��q�K햸�#+��ٯݽ�YF�ĩ�aeG��fջҕ�4X��-q1�U��d�v/fR���pj��ŤV�$獽W���H�V8�[�b�LC���ݛYt�9{Տ�V��Te���6��hZt�9MՏ�V��QE���nw^gI�4[`_L:�I���Zر,:�X�i����]*�8J�
�٬+�٥~l����F*�еU�9�JG�4���Ee��cn�ni<�4�`_LiLNJN.I:��i�����yH�Vw��t�9�ӏ�q�b��L��¹=͢#�y��8O1�S�ɧ��f��ҕ�|N���p1qS��wDٴS�#�a�n����4�:l��HöX���r��H�h2�~��NG�ź���5h�E�ݽ�EG�ź��2eO;�	��S֕�L��mq1�R�����	֑�m�n���DK9���<��L�FG�ź�S*�hr6����<'z�no�2M��cv1�EW�3��i�7Ż�E*���ci�ޘv{S��i�є����u�a{c��M9�O�q�r�v��u�a{c��M9�O���"�n�R�#��no�YG4q�+*i�ޘv{S��W���!��܏u�a{c��M���CJ'߽�EG�����_�^�&��z��7�#��L�ܯx�ͪ���,����m�-.޻+Ҹ�N%�S�#�b�n�����4��x�o���s������x��Lch�ȥm�ai��v[\��ir9��Dt���-�m���?���	���}�#[b�n�˙"M�fx[�:Ұ%�햸��'Ӥ���y)֑�-�m���D�#:��7��4l�m�%.&�i���5x%i��vK\L�;�!��<'�yh����#����}���4l���S�d=�����4l���S�dC�1��qY�HÖ�-q1uN������scki�C�-.&��40����͢#�bh���<:�&P\.��Ԣ#�bh���{_e
w�4�`�6�x��H��e�i�n�#�`h����[e�|���c�u�9�C�.&��46�H��Vb]yN���oc�ir�4�ݻYt�a��mp��U��Q�p�[o�:Ұv�6���vD�� a�n]y�z���Q�i�	�`��#�`�n��7��4������#�`�n�˹j"���`���u�a��mp9eM���������?J���      w   =  x���[n�6���Ux5x��V]S����� �l˶�Q ��H��5t�XIJ�ht8�Ѽy�����~B�_ꮻ�~������ժ���'��4��߮���k�q��EJ⥈K��ӟ��Z�;[���uլ�ڵ�q����ѧ�w�y�k���)(N\�)��@��r�=�Do��ޜ!����`�$�2������A�_���D)QI�foJ&5Ll�r�\��_����0ۜ&B$!�/�� �@<@�оV�8�\u��:��a܌��(7�v����i�Y�d�J )�����m�T��mي�"��~,�Ҁ�cޭ�u���U�P�pl���ЬV�j�Y&4�K8��X��Kv��A7_�z��#�v,6d�X٢�l��V_E��]��g���I!\��[�ye����_����f���^�̲L���fJ�7ٌ�����2Mw��n��X�m�>��C-)WP��M��ZI�\l��MN7?��'}���t��7S�q'kk���V9�Sο��*D=��y"eJ ����T#V��%��s+�_۾o6���Q����"�����jE�*�M�[�2{�%<*3�%Q3j�J(���n'C�[�x6g���śs��ff�ZI��m�뢾j4�> �v��s:�K̍!8�S������t���UWݷ��C�}݋�����d8���Z�Y{��۹��d�U���a������F�Q�t���zrA�^$ВC-@���ިѯ]��� .�>�(C��L(&��ʿV�ȱ5�W.p9N����eJW(\������淊�י!���f.z_��u�w�3�9�v7;�<�3>���jw�<֚C�5�/���<3�HE.��\b��jd^���}+�G��c4«�d����-
�5��ֲ��K�]�V�����*�hK��;lS��E���pYO��(���?'���U5~�z �<PYk��R�q	5੆�K����3�n.+-Z�����G�����U���xrEӘ��M%@4��^;����~���5��?��= �zszl��V�3�vy�H$$���y���;��=�k�T���l=]S��nz1g��P��* g:[����M�@���U�`��/c18Qc���!�h�6}����H}�ϱ�� ��V��{��V��m�������ES0�+[����ش��D��즪�z�se2��}ֺ �Ģv���lE���������� 8J�~S��Ja� 0��/m����ݽF��j����4?�G�$z���C5���&�q!��`�Ƿ�����_��^�>3�"jޮ�K�d�䝠���tl���
�2�76��������1��*�?�?;�b�e/զy�V`��-��>�A;=�ۃA��I�����|
gԘ���v������
�Le����	r�<��pm��7$����h�W��0���cѰ�'�΋\b�a�3����k05�K���&9���r��M,�i�-�*�("����Rg=8�Z����$��$soA8dIs��9%t�{��N��C'���	�,�kt#A�򎄳�#Yǅ�N�:��"�N8���%�?>Y�,/C�h( �&���I��s�m�;Ii���$oV�fe���8�Pb�_	��z���gY��$�d
���� �y��!���"׿<��܇ay�I�»�e/%��>$bA�����[v�G��S�Bi�.|���pbgñKt.��H>Dc��	�G�H�f�J�#�E�!>+l2���K�u��,�>&N�lLv��~�mnXF���D3�	��	�=G����̂�>6>%��@�$�v.:@��L8�s������(���Eh�H�	'z.F[~���!'���� b�I��V�0Ӽ}���t�7�j�׀�T�pl���|�&�1�Q����d���IW�}�%�i���"&v?׻0^�\N|�%�a�u��SQ�yv�s� ���K���c����_A8�i����]�rH\�{���ܧbR�ʩN+V�'3f_5=d~��P�êO��޽����)      }   c   x�3�tI,�H�/J����2����M��M9C�S��!3��������"��9�GbQJybT�gPjA~QIf^:D��3�� $5ڀ38�!���� �#      �   A   x�3��KMM�IUH�H�KO�2���́qL8�3sJ�R��9�R3���8KJ�����b���� ��U      �      x�3���O���2�,.I,*����� B�y      �       x�3���O���2�,.I,*��/������ Z��      �      x�3�HJM��2�,�L�2b���� F�I      �   w   x�sO,I-O�4�41��L�JN�20�JM�23�1�t*�UHI-N.�,(����4�4�34��3R�F�������hjl����D��h[��1��0�3�3E��MM����qqq ��46      �      x������ � �      o      x�3�t/�/-Pp�4��"�b���� dmo      �     x�%�ۍ� D��bV�'�r��cg�8��V�ᱺp�%�E�_1�O,�qċ0�!|��bL�)�8�ǹȑ�F��<�h� �c���̑#�@~�%rj3�5fV�c��;��D�:��
�7*E(�P-:�4<�%��s�i�-/�`z��eI�s<�7d���alZ�q��%&��)����,�הΆMŘ�3�f��������H�ع27;չ��*��uW{�D�5\:'pt+��}5�~
8��gg��G\_����?�T�      �   C   x�KN�LFE�F҈3�+Ə�@|CK]# �2��E�!PGr2�$�$��1��`qs�q��qqq �#E      u   >   x�3�.-H-*�,�/����2��
$���Ɯ����y���	�kNjrIQ>\$F��� .o�      �   %   x�3�I�((�ON-.V020��4�D����� ��      �   �  x���;��0�k����_r��J`�X � ������$J,lZnT��<���h!�Xy�8�$��l�������o��뿷��zy�������ox�1qH`�����6�9_~����'<�M��@��v�l�.��a���@v�c��o�a��"��d���bS�ָ1$�ᢿ����O�&�&4�q$Hr3��L|�H	�V@��%`�ZİCU�u�=�J֛��<!JV}���z D�ʥ�k�1 ��R�ѵ�f?���h��%2,�Fۭ��`w�P"�Z�Q9���^w+O��\2�]>�J��t+/�r�bNtݲKnnv&�'ĨD�o�W@!�n�б?���	��Τ��31�koA�)s#�YD��T�S�4�ى��j���9x&�p�ҁ���Đc��{#�����L�����䴿,��oA�פx���"B���,�塢SL�&h��踥���ѳC��A�+FB;�:�y�I���c^�mEW��\����i�[�����t���~��YrȞX����M�5DM*�|6+#���[�%����b�!��Ta��|u��)�	�e�Ե�uY�+�u-��=�q���cG~W���҉�݀wr�治t_�u&cm�0�w雅b����`�U���9�N�\���      �      x������ � �            x�3�4�42%�1~\1z\\\ �            x������ � �            x������ � �         �   x�3�����Ē|N�ļ���J0O7�*���� �8&�@�1�$���e���U��	Ӝd�'��e$�e}��<g�&;�������4�.�\]��an� 1_]�nc�.�OK13*N�ius13
vj3ť���*##�d]s�c}�@\g 7���9���b���� ո^b      s   �   x���A�0�����i3��X)"�KA��eG���vd�����G"�ѳpH�O���aS;��D�g��f��V����K�rj��y���;��$�):��L`ۑ_ߡd��MJɠ�*I����-�� �]K��+Fw J�"~��J"            x�u�Kn�0��)r��[�!�/������6��^���D����o�&@@:@�OFO�'�(�#���49;|w���1q����A�����ac<I��DV�p�sa6��e�-yA�G��\�U��CG^,�*�������XlZt[Y�N���[��iٖ]�Ĩ��j!��ڗ�lo���ҧe,':[e~��gύ+�H؉у0w%W�jQ��b�Kheh�2o��WIх�Dٯ�<��	����0�s�j��	íS           x���;n�@�z9�h��*s �"���D�����;X� -��?���v�=S�X��p�����?]/��1Px	�}0N��:|�����$%�^��8�C:�����c$,�RQ��4��.�Vin�\�TI`���s5ĸJ�FjB`�{���7$�䟆<�T���S�w�-`�Z@� ́Q��u���b���F��L-�Ҋ���7�
�f� �x�C�f٨A�*��4#X�yC�����x�a�`�wY�<I[���u�7�sݠ      "   3   x�+H��KU�ML���F���Ɯ�\(��@Q#N4QC��	�!W� 9_      �      x������ � �         <   x�M�� ��m �8�:����3�m�Z��Ťޣ��i�WI5����e"Np��M         �   x���1
!@��9�X�u�9�}`	l"$B���-b�T��>~��v-���&�HiA�j��8g&ŊԖ�������jІ]۳0nϡk�W��Iz!2>�_�=/�Q�M�vW3p�`�/a3 �ĜB         %  x���Kj�0�u
_ B#iF�t�l
���^�>I����#��6#��������弜�����s|ZΗ�a������m8<^������?m�͹6g�͍ƷI�n��6�k ��L�e�lHǀ,�/�o�CRYڤȂ:Bn �!�g��u�ED)d#Pw��*HG��B���䐘=j���v��$��"R�N{��ޛ�D��g��M[���F�nD�bv�~G��I�L�ދ@�=�gQG�L��k����Ut�^	0ɵ�F�9u�^E%���i��M��C�Z)��Zq      �      x������ � �         F  x���MN�0���S����Dl�@��X u��ncəT�͂�p.���"��*b�ּ�oތ��G&)0.�v�{�[��j���`'��F�Y�y�zt!P�x�-�������$p�������vGD�r�����X����'ҷ8�aHT��V���J�������_�"Y���9�� W�jF?N�9LѤ����JܴPe5��
^�w���t8,�z;N�zD(�6PA�K:5��fx�a�3=LcJâgE#Nꛤ?��&�o����K��wD��=�pQ��{����K��].���٥�?X�?i����5��ٯ�=5{�)!�I      �   �   x���M
�0���9A�4��7�*���L�N�?��M��]խ3��!�ij@8��|Ρ�u�Ĺ��@�1��~��Ot�^LQBS�]�	�K��Y�궧i�.4�@c����=]�'[J~r7��<��H�4)z=9s��b�'���9��3�'��o���8du�4�Q-���KIѰ��-���蒘*W,��X�XH�|]�A�)���,���)[      �      x������ � �      �      x������ � �      �   �   x�e�;�0D��)� ��(A�E��X�!) �q�ӳ�N$$,{�3O�546-_�K����5�.T��	�	��f�f�v϶#�D�����A�YA����/ٟ�������W�e*�����1��
�%H͓>d�
$)�H�a7x�ITi�ə1@R����?��р�ֆN~|����������)��x��qޜ����2y��F)��Doy      �   C  x�]��N�0��ݧ������~ L��@BB^��QۤJ]��=q6���wN��Ia�)��G4����X��:/G������e��	,zS�J4h�eȻqY߶����BD
����H�#�1<�+N�+_eշ�Sȵ�Tx2�WK��%���;� r�*?�6���NaŘ^P��6݆����T��4�6J�h|�Z̿Q׸׵�3N��k��`s�m���݇����2�"beO�t��0/mtG�7M�����!��>�m���|����$��f�So�d���T�GFxs��O��iYs��ɧ(��������̗      �   n   x�U�A
�0ϛW���$��'D�$xU�""�?Z
�B��fg��}�q��z�UW�uDLC�ŕU,��)}6���E[��V�V�1�BRl�S�c�P����[fɇ�V&�:n.�      !   1   x���L����4���/�F\��)���@�1W2p�q�p�)S�=... foi      �   �   x�e��
1D��W�.z�~�'�̓�PJ7��6]���n��K ��7C�E=B�����O5���ԫ�>�0f$�)�jFf,�+�Pg59O���`�r��ik7��Tf�N����^�~{3�(��m���;��Z�/��N�      �      x������ � �      �   N  x��Yۑ���8	�x���l�q܆��A���S��G�lC$X_�Q|Q�C������l���	�����O7�������tv�tcN7nJ5��K/��u}�@�lX��&^���i�/1}��xX�e���Y1d����آ���Q���vl��xpb�=h,R��ƭ+`C�O�t���q��-ԍ`�����݋���y��������|�����Br�u?p�����������_U�I�(��]��M�d�,_E�F-]؅j�l�v���3>>��7���!�B}�x�����K�~�^����Ϸ|��==|ϧp�bƍ���#���X�_4V���Ieol���k|�>,U�ڇMq0���p�vO,�?���N��֧��w<����&����/o���?y4����8�z�xk�W�O�^<���ċ�����BQX.����eʔ��HҌ�����n1z������R�D.˩p�N�J�(̅�sJ���$%�Ч��O��5pi����!e]5`��R3N`\ݕ��{���-Nu����^��Pz���Մr�����3A�UJ���9g�DL�D+���'0��,��"�sΔ(�����p�N�;��)�Ͽ�IɉC�`U�Ȭ�y�'Қ��y��h+�.r�c�U�:��+��6��0���{ċ�5NI	6�*N�\�����w3�J�"��8Z����
�lj+z)�N�0�*�T�)����H�4�{fXeJ�r�Kq���6ê�VP)z)�,�T��
�H��E/��e;s�\�JC�xQ+v)�l-m��y@+h/v)�`Pf���< Ջ]�"�MM̰�Њ�F��Q�k'��D�1i� �W4��E��Дf*��;�{;���9u�����bT�)�8�0˹�ď��5�mF����FFF��P���m]v\��$�h&�������hH&�@�Xb�2�����d�ږ�&^b��C�,�
�B��z|H��e��5�Vz���{^�8�,C%��O)-��FW��~H�p\{A���[����)\:�∭:���9���)��)7Zj���5/\T8rbGz���h�Aq�:�hC�XFI!{�����Ębo�����h�?�J�0M)�Ͱ�bSs:��5JE��a�����eP2:r�3&f&�L��sH�����a*޲ϰ�C�.s��|�LH+�V��{NV�>33�YfX5n9��^�>?P�ϰ:��c�<���ڟ��������gJ�PT�S�o5"��s��~�~P��x?,7h�V�J AX��aux@l� �?�>�P�9���Y�Ĺ���sY�w�Ym�Z޶��@�v�3���f�%���;�T�3�BnhV	+!W��2��#��h_G�1J�%3����ԭg��oP�3(�mjb5�$�(J�Ћ��o����b�rȢ9C��к]6��V��@Z�c�����ϰT�!#G(��{¢<L�1O8s�7f�s�O
��~Z���DfX%�fJ����B��@xb5E�^�2�����۷�������鋕q��y�*c/��*S�!�2v�����|�9~���h��xO�O/�N�Y�5[�	%�#�#&��hp�/!QF_��J�
�����ϩ����)�'�F~��td��33d�h;�v�h+#��N���=<y}��|�����J�2v!4���D��?^m<��V�hdͅZۓ���p��I���0d$TQP��<-�}��8��~�iEYC˟����]����6#E�#�A{�7R��H�&�uJS��l}�Z�A�z��z&�����ҍT�`P���=G(����sڦ}c��(�G��SK)�:�      �   �  x��\Ɏ�6=���~�F�K�<������l���]�ؽ�]�`�~�KfJJR"3UBtS�q����4<=��t���o����2�R�B�0�?�����?����Op��������V�����y�@�} s {�v�~�c�/��Y0k<h������b�+��A��1'f?���__��F�}fXR���Y"^�r���mxNM!�A;z~���߼1�{0���X��l��.=���:(;zGLQn�ف%�9 ��+�d�Gfz�X��(^=��QY��NdQ)�)�|XH�G�"���Eq��O� �*\�"Ќ@��G�o{�G".ȧR���������]x�T>
;�q�&m3���ы�����8O<�|�0��<��6r���(1 �,[�$[$ �%`C��\8���i�L�,��,:_4 ��Q%=���D׬H��Hs�A�]�@�HT�_"+^k�DFG���,�N�S5��+�.�S��sՑ�+fS؍\?������ɤaQ�b���si�tБj��B���peq�/���_�zWas�dS*t�nt��eA���.9���\&�;3%�����0�g\pG\�P��k4W��EJ|"�0�!��A�>͗����I��_�4���Lh��T��$Ι$�%��V�/ż\��^)D� �6�RrB8t8>�ю�=�������e>����]3I��A�h�3��y�YA.�����!UQ^Rt�}\A���Ty:k�>��G�"]_�Y����>�oU�Ŵn��Br��b�gDG��K_���Ƕ�f#(0*���jl']�"�jd�b_bR�Y�h�.�*��(=���pg	��#l&¼�h��pKw��J��QBs�F�ld:
e%�XI=��y�}�iq`�V0���Ϋ�e��H&�I t�e31��G�5�J7�R�:P��T�ŠJ^�\�0]�w��U*���Q�s:f,F?/#��JIT5�t:}�=��L����)4���N6�ܤq��v��;��%�q�ub��٧
�J�}�y@>(�oƌ~���h�QIխj����(���~4�l�.�N�з �"��(ɢ�ː8���{*�]"jɁI�j�vH8(�$l��o[Qj�
�~ ;TIL��8��_\`9�L�*ư<�ߤ�?=�~����=\bSH���1V�fGl
.N+omZ2ۗ*�w���r!�a�M�+�4�U�%U=h�T(�ϲ 1Z������a=�O\+��H�X�=�>��}�3P�D�}��+=��QQ0��h�SV /��Iʒ�8���=�{��,X�V���w!c�s�J�=k��~�����,�Z0Q�\��S��5u�z�����K
�Btl���P�C����AYoiz�$�>wJ�ֱ�8}u�cC���Okm�c�=�XM_^erù��Tof�������ٴy-b����ll�u��*t/5.�;h;�O	���%BhZ�%uO݄hm�D�ڹۚ:��:U�$��E�7B���VM1�Q2.�h*�('Hf�i߃�=n'������P�p�A�
�dL7�����0��rG��)0�q'� �"Z�<z�6����z�tArHq�1��'��-͂[��c�3:��s#���k�v��MZ� �4H�6��>k�1����ž�M!l(z���.i�f��'p^��t����b�M@���8T�ޙTh �oZ���x���q�@)8�\������j��O�3���!���9� Y�=@Y@���,������i���43[�ML��,!c͈ʢM�$� ��͛7��q���o�2C�so�H�9A�[!�N���֨�$"�y�����<��Dn�ըby^�Yq��'P1z2��g�n�a��p �u�raĉ�O��0��~s���ؗ����G����W��ga�k�����&jfNy�I�D#�J�./�h���^���P����G�@�}����i		���Z�|��۝��>�X#�)w���@��㳈�XW��K�$VЍ�f!1�,�N�~�Q�I�`�'|S��h�
��e�)��k@.	���g�����D�gCQ#D����Ct"����9�%m��G�P�34�lU"j8="�Sv(���g�K�	L�X��o�N=|�gF��H�ׯ�������k���܄�i��V��p�>��/p�>�Űr�^S���`3z�T����XDl	�b�J�aht�5gT�D���%(��7�
Z���kin��VP �c�)h�����wy�j�)�"/������u�Ÿ+v�1�_�����������������$��3!Z᳑z{j��J�'c�8#]�9��cRs�����[���ǝdH{���v��Ktɓ$DpɺI�9��6!�v݆�zQE)"��ɜˋ�Y^�oLě(����&e'IϚd����N���X'�C�S{h��B�>�QC9�g��FU(���ԋt��*� ������u$�'X�_���Ee�-2*'�|�C��-z�L؈����S��lvg
+O��?4�L��ɂ]������vF��][��c*T|�T��jyU�\^�2��=�@W�ԨS�ե�0�Bm�N��K&Iǘ�Kn�vA��ݥ�F�����/5*��TԨv�(�W+�~4�}�WY˛��Z�k��5I�!��~7q^���*��)+�[���U��sf*)O���q�&
�S��߀�Uݩ3Q�\֩gbP���2FAY�L|C� ���%����n���k��uH{[���n��ԡo̶��N�W望�M5�:.�T3���y[]��U��OZX'0Wo��1o�����]��:��%=�c����}>t�U��_\��C�9��~De����{J��F�Uki&W�f��X����_�oU����Ö^�j����k.�\�<�j��f�lW�c��M�q��0ו����ؚ�UT������5�'͈�]��`��i�\.��P?��X�_��5pZ7�35�2�5��������uAU�Y�u뱈�j�f5$Pۊ�7)j�(��M^�u�`í�X�Zo����W�c�O$�����ɽ���NP��k,XN���B���3.D���|8���N�9�".W2�������UHǧ�
���sP�t:gz������m?��a�t|8bd���^�ӽ�3V��k*7}
�v~)fyۡ�J��CP�/�U�<��ĄS!p"���J�m^�ҧ6>�s�	��OU>�R��Ta��Ln_��~�1���O���RL�M����7O��\�lL4��NGƹ��q��t�:�Ҋ��42O����_�>|z���a����^�w�ي���Dl��GQ�w��d9U��2#p ǳ��+t�����K�p��t��&�)~6�(~��QV�"E��9�ɰs������OS�pv�Y;�ɦC#�AR.=7�Y���O�_���������W�<&�|#K���xl��c��.%�c�J��e �����=R�&ޙ�xOU����1D�3���_>�R�Gc㛟^"�߶�ſ������xm����9�^r��_�w
�w/�z���Ǉ��K�p�z$�&m�!���3����f����桁�J�����e����+��� (}X�'�~�U�D�[�
ra�Q�ý�匋{,�`�|f�v�	����;cLxZ߸vX�u�+��v!�x�P�"||��t ��n��onYIڎB��Y��������w���V2ǳ.lL�r="r8~�LJ�bL�bt�g]XU�E����q9gk�[Z�
t8��^����`Í��Z��Za����ƻ����y}      �      x������ � �         �  x����n�0E����V+{칶������R��
�i�$���Z�6䚬@(���9Fx�BwqF%��F�ߗ��	ɨ�y8w��};������؜�s�ߝ4���i�=������}kO���O�{i�1"��������c��VW&���c�n8����.�o�d}.j���]=�pIF?�1���%��8�U��g���w���?M_�T�z+����o�-�u��X|}s���>�=�ϥ\�r=3c����;����`��QU'��L�7/(Oe쮘n�����+�]@�>S|�e3zC,���~ј<+8�wVOmYF�A�/>T�~9kM����0��(U��~�i� ��:oѕD�p�ϥf
�/w��8���;C(~R��[�=��r��%��XC�b�c�$(Z����GK�F� ���(
ݨd�#8(c$����2f��dI�R��R���H�ҴE�%�k)r��D���O��x�XˬزpPfO��I�e�k��k��k9�h�y��O
������!XO!	KyV)2`��;������`9���^���\���8�������9���H��y�����qP��P
�5�5�5H�� U^�p�$��y�k�����5xj^����y�����y���'�X��:��:��k��ZP�ぜ��ia��-t�P�kJzMY�)�5%���״�kZ�5%�����z����k �5p^�5�^�5�^��z��m���f��2μ.         }  x�}SKn�@]�)z��̏�%�)۞ ����q��Ɍ���e A/���<�~;��u|T���[���{����4sW��Y�&�n�"J`�$O���(o�X�IK;h尥٦^�KK�`�kԶzS���S�S��bNi�޲Xz�K�,�)�t���$='���5{ϵ_1�$�,[ǹ�L2��&��cV����O�ǝ3�5��Z?�Q7������%H"�j�<v�TNhQ�v��=Zތ���/e�lJ����^�!#��_��y�A��G�_�\�.ژ���\5��':Q����t�2�#�^����ON5����Â��F%���3�.�E�{���Л��Bo%���C9�)�]q{�,���i�      {   b   x���1� E������ ^��Ʉّp~���K��3��l��@k���TZ*<��4���K@�UM]�tU�U��ܧ�y,V�����8�      m   �   x�e��
�0Eד���L��c����঄i)�!I?�
�����\�3��i��3dN�>�aI}�cS�yԵ!�|(�E4�w�P�R3��GZ�qV���D�p�@�Vv���j��ƹ?���d��3��&�,դV��B��J         #   x�3�4��4�2�4��`�)�	�o����� `i�          &   x�3�t�H.cNg ��2�tB m����\1z\\\ p��      �   9   x�320��50"NC3JN!8JrFr����d��d$��0-`�1�W� >�      �   K   x�320��50"NCSJN!8NrFr���b�Q(bp�m���n
D��f �Ɔ�1~�&@�b���� =�)�      �   7   x�320��50"NCSJN!8� !�H.#baW0
E�јӏ+F��� ��W      �   7   x�320��50"NCSJN!8� !�H.#baW0
E�јӏ+F��� ��W      �   7   x�320��50"NCSJN!8� !�H.#baW0
E�јӏ+F��� ��W      �   7   x�320��50"NCSJN!8� !�H.#baW0
E�јӏ+F��� ��W      �   .   x�3�L�KL�IM��2�L�,�q�9s��L 3=̌���� �T.            x�34�4� �=... �%      �   ,   x�3�,-������2��OK�q�93��R3�`B1z\\\ 4�         Q   x�O�,��K�,�ґ�&\�y)�E
E���E�� N<��i�d��pA�HNC.�����
μ��x�i����� �         ^   x�+.I,)-V(I-.1�,F�Drr!	s�p�8��e�e�Z���R�8�D$�	WrN~qj
'���4���S((�O/J-.��̋��#9͸b���� ؄2)      �   (   x�K�KL�IM�4�J�,�0��r���SS2�8��b���� �0
�      �   -   x�s*-N�HUI-���K��tB�rFr��#P8F@�=... c      �   t   x�U�1�@��+�@,{��ȟH�)E�H@�q�$��xv^���q��*s�.�?:����T4��@������CG]_��h#�^L�u&55�Υ�4��X��I�7��*�         *  x���ˍC!е_i �6��I�鿎1�&����k.FՁ���D��!�,^L.}7�@=f�iLOF�Fpti�s���C�{�X&���,�{�:�WT/�'C;� oF:������>�٬0OFo��
u���c��%�4�'�{SO��g!��#�=R��1xm��?���`i�Pu�TqH��TGqqM�f� �@i*�P���M�3ͨ/�x�x!"ڣ���\�|D��2Z���Y�}"¹��$Z����ϿC:�dɅ�=!�[TK��f���'�i�u�8���         �  x���Mn�0F��)t��$J���l�ƍ�7REo?��i+M�v��+��Y�L�u�w��F�, o��5�L){oH�V�������)�L߁1�5)�t�`y4T��bv��M�ТT�K���$�wlX�bvdwg�*Z���eo'lѴ��.#�E��{}<���a*ն�z�`��G������@ߪpV�/��ˏt!�̦�7��6��Oe����8��ͶCy��RF;�dA��l[��ܯ�{>��Kr�r��˨.d�e�A�%����-���� e��Qa\%�� q�I��+x=�=���_Q���!��-��%��W7`e���kd��R��,fʐ�L�l\�9��9�S6u��f��g ����������.�R�cR�����$��B��)(�b�5���d�On         �  x����J1�s�)���I:iB<x���#��
�"����0�N��:���I:s5��{ۣC{"`� � �(�����n/ݍ�u���cplo���s.{�BXX�FY�䗻�ގ~������_^wӫߍ��C�ꐋ-�����UC�tZ�u�o�^�w�^�Tu�˝'����4\�� v�6  7�	����phyt��e�K��ƄZA:�T;�S+���C
4�r�^SK� ܘp�D�&i�֍G�5s��a�N���HZ��07�����1�|縠� ցh�)U5r	Vj��E�&.�S������͝=hri�A�$��.��hUkESgW�����PL����H�]JݮԙA�e�`�����j�8�O1����߆�f��t�      q   T   x�3�,.M�JM.�LI-N.�,(����,(��/�,��,.I,)-�4��2��4FVjWkUlVmJ�j#�r3Ҕ��=... hM      �   8   x�KN�L##CK]# R00�#NSSNC�H�dj��j�J�N�Ɯ~\1z\\\ 
�      �   �  x��U�r�H=��g�E����n�/��Gֆ1� 0��]�1x���H!E�J�z��K�l4͋�|��Q�F����
^��Wq��<WE-��V<;��,jx��:ٺ�{�l6�s��Z���=~|�}��(-�<C��>��ğD�xb̹ј*�hH� ���'�Zp�� ��3�GI|<��b$M�3	J�55j��mt�7$D(K��J��(F�!�`&_��`��-�
Ş�!�bŴ�� �#��N����p�@��x��W�� ��J)�\XY	�$ ��h�N� ��S>}i��]�b0l���_��ͬ����[�6i��!�V/�^^]w���������':�s��ZJ�,��y��a�b���5$(Ϩ��S؊�&���B�c��A%`��(C��NX,�OI�y��	�-��&7�L����8������|}��m�t��w볹����U�|����}
���5�����|6ݱ.�2����(^tn�(*5)�&�?�
w����h�e� �Gն�Be�lbmt6<a��q\#� 6X�_RځPV*B������3��'"��X��`������*�\l��ίUG�̔�p�͢��'/#h���f<S�������j7��z�U�|�/>�;�I�x&%�	J�`h8'qv4)}
�j������/��d"13\@5�4ΪsD{�9ip^���_g`0���FE����l����ۦ���u��j�f{���:� [����e�X�._ծ�R�f��@V2��e��Wh-׵�����]���O�~f��o����uJ1!�|������J:�i�G�M���A���>���")_7�^�A�&]߷�S!�ϛ�:iȿn�˥R��13�      �      x���K�����ۙ��	��y���~�K��G�1vJ�H��s����[O�����aʟ#�9�?����4�;��������?c�_�w���f��9�`-�,,���w�_(���?�9���8~��.�,��ϧ�����@����v���@������#�����g˴@���b=�?_Xs�����kp\~�E7�4��Y=8'Ϡ�B�y��´��A�ǜ�^3�ڹ����	��5�n>����98"k�O�n�;�\�����'֮E�ԣ��{^�A֮�,p�8oY�'�i��ճ���������٘��mL��w���o��.�,�y�σ�'�\�NO�?�\�>���V�MiZ�������������"�o�y����za��|�vn����2�5H�Qv�@��8_�sO�����>�?�\���k��z�k��gP��0�v�����QgP��9��=<H��P�3��~�=���M5Lw!Dy��}>έ��^����>�v>�,��7Y�xJ�gp^��]��{�#E�u.��9_���Z�P;R;�|�,k�>\�q��q=e~���'�Y ;�+�����{�?�3߅r=����Y��1���:����Ҵ�1&�.�������O�|���u�t�V��I��u.�y��.$+�µs��Ѵ RrbO���n�=����4�)�'�����i筵�w!%y΃����҂%��~P��M��"#-����(��sО�z�.����a���v\����9��� ����>}\�v^��'���=w��FVV�y�mF`-�~P���X>�D7YC�_�b?�v>�v^`|X,`.�WӞ��٘nc�㻰,`���5|�J�[(�]{�1��M�/��u.������=w0�XK���ܷu��>�����ը�|/�׹qc�꾸q<�{웿�{�����[���ܸ�>W�5�b5{�ֈ=q ��h3t�o�x0�E�>���/�v^��ضQ���x��h�k���F��h�Z�c��c ނ}��س�z��Y�2�LNy0�Usӎ�Ķ� �A��6U�B,�Y�N�ov@�,BG<�>{�co�l���6[i���/���A��EܜAC<������QscC��jn^ ivn'��:/�7�Ft�6}��`ĸj�����k��$t5F�-����s0Ѳf�F
���Ǿ8�6;�B������+��!��	�P�6�i刺	Ͱ�0���ܽ�yp@D�u�������~�ƾ��P;m��J�YG�#f���:�@�!���Q!��g���2�(�fɍŮ����L����~0�ȯZ��@�H�����g�Ob*�k��Q`-Þ���9x�ȱ��f߅�l�85z���?��g-������X]��}������ZF�6R�8���6�E���v��ʱ�Tg�B-Xx��?a]�R*i�+�,��\���V������k%�tM[���.�n�=t�o^d_&c��ؘ)�fz�U���6m���-k�V9��Y ��9x����%�}�m�qnB����o���c���EKxn���*`�,��<�X���k�X��_�G[�	/� �X+�N=�7`�t�s@�M��`���� ,�X�bmU�.|�X���Ѿ,B$�ª��Wn�qpY�����Fg�΋h���r�E�l��{�Y}o�C�3���:?���v0��'�Za-��$��Ah�5t��"��"O���w!o�^�9T�Q�i�NB��-�X��>/�Ce�̪�E���2k#�Y�/�s���ol���w�I�D��gH�	>�:H3���k5=Qi:�y�(\�$3u�<��߅��5�Hh�C|��-����D|a �]����e����i�yR�����f����k�N"��A�H�G��FscC<K�*!��x]G�Y*s�'t��E�C�AscC<�6�eLw!��#^����v>
bm2��	ͭڜBQĻ�Z$�[�>;�Qxu���x/h��Vm�;�h�B�6�P�$0��8mo��vD�m�)��®pƙ��`s�!^������꺅�kso��pe�~`��P����~�����	��:�c�a�����rq�y�~���Ź/�9T��D7'�E�ػUa������VeF���~`U"�`D��<77S�"�����+$08�.Ft�eؑ�c#�u�a��e2�quA���k��8nF\4�	�5>����q���� ��6#�{��UB�6'0���x�h�5�*�k ^d�A��W��xK�?�>�@U��#\ġ��]�~p�k	C�ʓu/p2�����l�`-`����ƈ�%j0t�[��c�7���9�T�w0bd- �E���1���$���ז���8#�!�y0"i�P��FL���}0�3$ɗ�}0��f&�&����� �"�AgD^����v��ƈ�� ��du�������Ѽ'&/C��k�D���~�g���9萙Y���+�̰h	�$�,�E���hrm���FW�Q�"���LC��R��O�YK���{����@Y2��Y��ga�u�̔�j
��'^�z�UE�Y�#�'Sv����h~B�:�� 3�`W.Q$y^�YC�q��Ѿ4��x^iY�_(�+l.���7
frݜ9��wfR��s�'��_s4G�����f�Mi�= �Z4���dQ׸����?��d����5�U�<�N�tu��p2ʹ�ʍ�LU�kbD�"�V�F��y�V�`D�Z�$�U�=k���Ի0�s4��>c������Ay��4F��QU�{!s�Pv��T����7&L�<�[�/|7mΜ�*;plIs^ř#.�B�K��6ѳ���U�cbD���蓸��������:��U�P������Ԧ���I�Å*h;-�˄�A��I����Z���pa#4�j�� ����ܢG]��	��V��:�4�4�.gꄖX��:G]���,Z�O[,�,�Za-����%�ͱ8��m��I���^F<;`e�,:�R� ��"�HI9�n�r�4K�Ydzaˌ�����Y�/x�ha�D�%Ϡ�ђ���'d��?|I3��I�v>J�]��gaⴸZuL�U3�Lz���H�]O�쎙��4¾�u���ђb� �D����(�5�4�A�4f������3S�\�=3�5�iۖ�Ea3pQQ�n[�+P��@�ii�C�"p�~�? ��ie�L��\d�t���]����}p��h�s`U*� ��U�4��0��zi�4/�xc�#.���c��>�ha&,u*f�Q!�ܔ���S�0�� ��)e�C�3H,�Z�����Jh���;������K�7�����Ѿj"���X[��5�}�؇ɾM����F�A��������8�Мa���^n�Mh��9�o�B���5Xf��ڒ�J8���k�`$�4B�4�r���,Q��L�qm_����m--P+�º,�&ѷ�Bms*c:o�Ħ\G�0͓VP�Np�	�4L��:��	-�`?�:��	ͮ��i�i��Vm��(
{���+�kNpT;�MhnѰ/N�:��"4�hXi���7vB+�U�[���t�
j�>���gX��>I���UP�'�;�eҌ��>"k�A�H�w�b)2��[��d*��g�/���Ʋ��?��W�Ai�L�l�g��oc9�v�|�͡2ݕ�1�Y4G�(��F\��!�y�k�Y�:/Qd�����YH�4+mk��,�#jύ
�on��4�D�7�h(��X^��r%}q�+�]���Ke#�^w>���~`�2�MC���sL��;f�P%`E��9�M�Z�j;��h���9ҥ�<7h;֪?q�UQ����5L;�Ix0��k;�;- ٹC&�A��*��Lr@ثO��.�k�iY�Hm�e���y����1�W�B���q�Fh�54q\z;g�㶡�*���Y3�T��Ah\�0�ԋ���и���*S��<��e��W�1/�����U    Z� 4n�Қ2>������P���tMW'��AY�rDB��a�� 0B[bm�7<�D;j��?�9
�M�+B��e�P���Bs�q&�/`���\a�f�6F]���u��r��u��6'�E����+먻q�Ea�H��DՔv �c-"�	K�A�DZ�]�#]�5�@��eHz�C�"4�.s��gr�"_yZb-Ç%)?R#4OY�����I�lwB�����Nw!���qe�O�dQy�'8�;�&��:�q��F��	K�!�M��Q�8���lT��6W�;��	��)N4�UX�,��;p]��i��D�!y�_�uncIr�]��P�/�ۏ��.�ieMC+�X7t��#��K���������AZG���m���k�'8���j������V�jX�Ye-/X���"4�h��Y/��Zd#Vřn��m�2�$�q�a��6�� 4^ $�2Y��������N��B3�a7�RiFh�����.e#M�=�0L�TB�@��Z��q�Ehn�"Q��O�=� 5�Y�^5�����/��H;`qiw#y���x���"���7��f��q&���,�H�5�3tYY6 �4�Ts�X����;6���>Qr���\�f*��Z�A���-�Vh����Ҟ:�~�CS<t���C�������Qa����ΐ,��� �S�3>"�DՐu�Q"�be]R^��G���컯��>2���2�C��#��ƤyL|D�P^��G���R�d��qp�hs�K��
��H�2Im�ʪ��,���������8S'���"6�߅��8��X8�l�Nhz����j��e�,�EÌ颺�B����Us�ȉf"7�y���-^��,w#��˵2-E������ڙT���$����d�Am37�n �H�PYw���h�!	�*�#5F����7Z@�=7���7^u�ܨ3$ۘ Kg�`�(
k��>k�����	m����*�� ���-��9͍��H����V��}46X�/�LM�b�v���P���-�q�tΪT��Ж�*!`�K'�5B���ΜJ���P["j{����d�x���AhLm�P:�پ	mGm�PEy��qa���@^T�?�ƅq���7�ʹ}\ΐ���ܿ\�v07T!r�A���`G�m~{�c5�j��@<�����OG��qK�um��J���h��9��pnBY�w.�K�H#4���uԴ����xl_U�� �BZ��,�+�:��U�.�:H�/��l(Q����T�2|{�=�F)-��U��U�ag�R�5o(CR�X6�ˬ%�b�{H6�ˤ�Ps8�1��u矠�H���F��6��M��Z��8D��#ަ0��ܾ,j�Bc��|0�
��и0�6P��}�0B�a ��������#e=B��ے�fb1�(l��.�� ���ks�vh��t��ZX5zE�d#��.���$h�e����ޑ���+���Lo�<,���r3�(���]z!0�[��2G�����u��l&"j�.��]�]z�[�z��S�Dg�~�����G�.��������U�m��8��:&�]|��s`�U�z읾��o��F*e�7��'`����۸0S���3�hi&�4OeM|D���S���G<����3����(��d=M�7M(�̤��xv����*<0�i�Sչ��V���4�n�q�����"X�o�����A%<��~������7�4w������y�?Rs}��G���(�x�ư��yQ�#�!3$���t�Y���ƨ��=���ƨ��ޠfp[����7H,zq���ɬ�I��ox�7��B�.ݽ�j�FŁI͠x�ف5Ylڕ��:���{De�K���j�6_�+?t�a�_�,R�:I��GZy�@U�n���8��m4�q���y^��z�����?uԅ�}��U�q��T��K�jGֿ;��ۿ{���7�oT��up88@����s�\Ώ�7*�����'�,�'�5��1�T�P�h��F���:�kNu��V0�5�`���cr��Q4�y����\`���f��A܆C-�
5
�mȘ�8�#�(�[���8�m��f�@-=�$�AA�wʺ��FycG����j,��/�U����Jdl��^ X�EZ/��.�9w+��e�ˁ>�(R(���`�0��&}�-k`ŪM} �c�bL]P��7_�ə9������S>�错<!2iܩ��Z�>���44PE"�U��F�f�M��h0�@�j���,�6���Ć�5�}"��a�%V�;�W������(4�b��ؙ��}D�8ۇ��PcDhU��	'�F�@��8ݒ�izP����F�WKڂ�]��X���A�:��~X��+4;�Fٕ��1�2��V*OR�A����B�c�v��.��A��+1�z���\�ת���NQ��K/��;'Ѽ�al��ٜNQm
�=Y�����=k�Ij�Qcl��n��GR���؞�~�,rc���AU���13����,�'��h��E҇�9�w8�.��9��[���]X=��\FT��|dY�h�3�a�Le�֛��J�Ɔ7b��6%���y���k��)�~�W��K�L Ǎ<�|,Pt�t}�/�P���f&w�½�g~�}m�r�:0�ؑnBۂ�@��7}0���u>�Ham4�2�qRG�XTJ���i1��&�x�Y���p�Ҹ�J�ixÃ���q p���oHÑ}NY(ox[��d���nxW2LUd`��%����ET���NH�k�U���`�F
���7���4��v��:�0=S�gn��q�M���Yv��xcI�'1�I�oxj�˰�c�o�}$]���{�'s����'ߚ�W���ʥ&�Y*Ү�鐞Y�b�a�lS9���Xe�ή�S�����
r]�31N��\o����H�e���4a��˹޸EK8h]y��D�26oT>��7�@0�����L�}F�9�l'��76�I�%�U��<o��ʈUyʇ2�j�s8$G����7��w-�7/�t�o8���z��%t5:���m̏7����q0�p�Ȩ��o8�ң3.��o�}$��.F�s�I�aS��$35�	��5�%�8��Euس�i�ߙEv��L؈�!����mnc��-���u��gr��?HO@�3H^�<u��W�$�L�ڠ���6Q�{���z0�������Q��j����p�Ngܼ�Ud<x��9�d�m��VV��:)����ֳ���K3���*[y�	i��D�tX3�vO�n>�ѩ�������Nس�|�܋���s��@��>�|����_)��kq����3��ĵ�ǯ��;��V�P�+t�5Pp��W���m~��k���̸@Z�g`��}#��h��/mD=�`4�T���@�BZ�������:#ޢA�G���aIP�\�6� ҥ�D��@��>=5�!c�����ST��2�yA�:O�G��Q��g �[5�d�˹:�qQ]p�$Fci�gG�ŨSTo�#���u9WC��Z�4cަ�ʹ��	It>��L8?m������x�5��������F!��&h��aq6t%�G�����m�"t��s��� A�IL�x����7=�YOԃݚ��4�d"��-k�W�y�a���bI�0��u���H�l�����q����o�taJ	"T��`#�+�{��n�mk�H�EJ���}�+p��Mn�k�F��8�kI[��u�u�1|ř��drc�Z�����r���&��Z`�U:�sih�X5@sW�9l�n/L��Z��?A�ʃ�"kX��T� �Ț�~s�	�z��;��d1U'4���9p/�n#���0��)���Z���-<� �����`Ɍ��Q�����P�|�ª���Ťф-����g�y2T-�`����_^��s�=�e��6H�E(�	*�v�O��M�*�s���1���k �  �� ���HQ�B560��Z�!/h��<,��vo�Q��56X�D>�Q�Bu6��4��ޓ*"lX�V��΃,k�B��N�klYÄ�t�CC�� ��f76(�94��r@6����CC�,��p��p`�j;��.>HY$�<l�I��PY|�6��Qv�00�|�oå�Y3�Z˨�@y�G�x!q��K��NGg��0h[��3�>+g|5:����=/x���s���>,tEy?�Bڋ������_�y��X;ྛ"jw�u�i#[�\�:��9țޚ���5T-QwxS9ؠ����:1�aʻE���2,�)�id��XeXS�N�Z�9��k6�)�U���T���ė,�@ֹ6,oK�4�9��8�1�3Cy�%�X����
��]޻��[���2Hܝ�R�X�!�����ސ�|�t�$�S�j�}HH;+���_ߩ��2]g�rM��U�������:�w����)V��z�����������WE����ߕ�>��('E��j{oaY����	�e[�y����������u-�w�/������K����lbj��u,����ѵcۏ���us�~o�o/eh��^��3���
����~~�����r�����D�e�n�N�v܀,�B@K��;��>��p���G�m�s*u��zЃ-�?�S�}�t���3�V�rRe:�R=�}����X��Q��2�'i��B�\l��~n��-("�S���y�F_����gǋ���3��!u4���z*��[�0�2���u����R�Ƨ�$��4�a��3�*��0��JN�b7�R=�}�S�mb�?�}d睙_�����fY󘋭���æK��8�wĤ���X3�,&�I9�?̭�!��98��K'���C-�Xʦ͉JY��P[r��J������h��-��ݡ��#$&�'�m�d���M�B��آ���P[s�35�}����jo���gv����i)���>3�6�>����؃��m��3��]^r&Cwo-m�fU��>�b��p���`՗�����6��B;�cܮ�:�父r�4��~�Z�q�:���2i�>�����������+��������ˋ��f6-&&8���c��P��`���g6:y5Am�#܍ϥ�3�i�g@Ay�;ݎ���uϟ~0g{L����vLZ��ѫ���NH�-^y�p�Y��-��8��ط�@Pa�A'�����*Ig�	D�o33��V��a-�O�:���I!���庘�4G}f�����j8b%*��M'�[q����I]v8�4��u<��	�鏺��	OT��Q�6:Y��c�ՙq�Ҹ��m2F���X\Ĥ&�NtBZrMAwymt�9��O�|P��A'է�)KSw�	j��J�b��N<k�,>,\p�X�	�Y$�?p�Q}��Y|���.������Ȭ� >��`�B\[����I��l��p�A����@-��y��]���MZ5�u�����5�s�Fj;f�sh�i�� 2\��:��[����f�L�w ��5.��m��W`R#�����V��)m|����۵�gT�(��uZ�+�y�k��/��ۿo���¥����+��q�����k�`����|��8�Yo�������� �c�K����[\��y��o7�����Т�4�:P���2ȯck�������;��0k�<#,�KU�9�T�Q����p����k���O4���p�Lv�Q����A�.�P�lZ�>�e0Y�*�|�XkT�����bq��Ws��U��b�����^K���n�`!��p�X8U)x��-7K!-�C��"�łN��� �
�4	F���w��L��^`�E�Ư�5'�i����gq�m.(�jC��$�_��s���6�U��j��@�J��	,e(������<�	�Z�J�l����NG�����5L]�.���>�E�i/��3��u�l%E�3��q~�����	Ԯ���:����5Lߎ�f��'2i��DY5�7��R��@�����r�`�j�0�����Ĵ��/<�i�f�O
�Cn�Op�1�'�y4����X�!&�>��L����Ɲ��V��T��$M��4��³��H�"�f�r�m�M�O��z[�{�+��p���hsoy��v���֥t���)�����Z��X����>�jʡ�?�<�������������q�<�      �   N   x�34�42�,I-.�4���".C��P����R�����\�&�F&�!@E
��E�
n�9��Ɯ~5&HL�=...  ��     