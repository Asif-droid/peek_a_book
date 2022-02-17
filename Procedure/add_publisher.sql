CREATE OR replace PROCEDURE add_publisher(p_name IN VARCHAR2, p_summ IN VARCHAR2, astreet IN VARCHAR2, athana IN VARCHAR2, apostal_code IN VARCHAR2, dname IN VARCHAR2) IS
dist_id INTEGER ;
a_id INTEGER ;
i INTEGER ;
j INTEGER ;
k INTEGER;
BEGIN
		k :=0;
		FOR R IN (SELECT PUBLISHER_NAME FROM PUBLISHER) 
		LOOP
		IF UPPER(p_name)= UPPER(R.PUBLISHER_NAME) THEN
			k :=1;
		END IF;
		EXIT WHEN k= 1;
		END LOOP;
		
		IF k= 0 THEN
			--add district
			i := 0;
			FOR R IN (SELECT DISTRICT_NAME FROM DISTRICT) 
			LOOP
					IF UPPER(R.DISTRICT_NAME)= UPPER(dname) THEN
							i :=1;
					END IF;
					EXIT WHEN i=1; 
			END LOOP;
			IF i=0 THEN
					INSERT INTO DISTRICT(DISTRICT_NAME) VALUES(dname);
			END IF;
			SELECT DISTRICT_ID INTO dist_id FROM DISTRICT WHERE UPPER(DISTRICT_NAME)= UPPER(dname);
		
			--Add_Address
			j := 0;
			FOR R1 IN (SELECT STREET, THANA FROM ADDRESS_DETAIL) 
			LOOP
					IF UPPER(R1.STREET)= UPPER(astreet) AND UPPER(R1.THANA)= UPPER(athana) THEN
							j :=1;
					END IF;
					EXIT WHEN j=1; 
			END LOOP;
			IF j=0 THEN
					INSERT INTO ADDRESS_DETAIL(street, thana, postal_code, DISTRICT_ID) VALUES(astreet, athana, apostal_code, dist_id);
			END IF;
			SELECT ADDRESS_ID INTO a_id FROM ADDRESS_DETAIL WHERE UPPER(street)= UPPER(astreet) AND UPPER(THANA)= UPPER(athana);
			INSERT INTO PUBLISHER(PUBLISHER_NAME, PUBLISHER_SUMMARY, ADDRESS_ID) VALUES(p_name, p_summ, a_id);
		END IF;
EXCEPTION
		WHEN NO_DATA_FOUND THEN
				DBMS_OUTPUT.PUT_LINE('No row found.') ;
		WHEN TOO_MANY_ROWS THEN
				DBMS_OUTPUT.PUT_LINE('More than one row found.') ; 
		WHEN OTHERS THEN
				DBMS_OUTPUT.PUT_LINE('Some unknown error occurred.') ;		
	
END;

DECLARE
BEGIN
		add_publisher('Prothoma', 'Huge connection of books', 'shahbag', 'zero point', 1422, 'Dhaka');
END;
