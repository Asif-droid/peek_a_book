CREATE OR replace PROCEDURE add_book(s_id IN INTEGER, b_name IN VARCHAR2, b_genre IN VARCHAR2, a_name IN VARCHAR2, p_name IN VARCHAR2, b_lang IN VARCHAR2, b_summ IN VARCHAR2, b_isbn IN VARCHAR2, b_page IN INTEGER, b_quantity IN INTEGER, b_edition IN VARCHAR2, b_price IN INTEGER) IS
a_id INTEGER ;
p_id INTEGER ;
b_id INTEGER;
b1_name VARCHAR2(500);
b1_isbn VARCHAR2(500);
b1_edition VARCHAR2(500);
i INTEGER ;
j INTEGER ;
k INTEGER;
BEGIN
		SELECT BOOK_ID, BOOK_NAME, ISBN, EDITION INTO b_id, b1_name, b1_isbn, b1_edition FROM BOOK
		WHERE UPPER(BOOK_NAME)= UPPER(b_name) AND UPPER(ISBN)= UPPER(b_isbn) AND UPPER(EDITION)= UPPER(b_edition);
		UPDATE BOOK 
		SET QUANTITY= QUANTITY+ b_quantity
		WHERE BOOK_ID= b_id;
		FOR k IN 1..b_quantity 
		LOOP
			INSERT INTO BOOK_COPY(BOOK_ID, SHOP_ID) VALUES(b_id, s_id);
		END LOOP;
EXCEPTION
		WHEN NO_DATA_FOUND THEN
			--add author
				i := 0;
				FOR R IN (SELECT AUTHOR_NAME FROM AUTHOR) 
				LOOP
				IF UPPER(R.AUTHOR_NAME)= UPPER(a_name) THEN
						i :=1;
				END IF;
				EXIT WHEN i=1; 
				END LOOP;
				IF i=0 THEN
				INSERT INTO AUTHOR(AUTHOR_NAME) VALUES(a_name);
				END IF;
				SELECT AUTHOR_ID INTO a_id FROM AUTHOR WHERE UPPER(AUTHOR_NAME)= UPPER(a_name);

				--Add_publisher
				j := 0;
				FOR R1 IN (SELECT PUBLISHER_NAME FROM PUBLISHER) 
				LOOP
				IF UPPER(R1.PUBLISHER_NAME)= UPPER(p_name) THEN
						j :=1;
				END IF;
				EXIT WHEN j=1; 
				END LOOP;
				IF j=0 THEN
					INSERT INTO PUBLISHER(PUBLISHER_NAME) VALUES(p_name);
				END IF;
				SELECT PUBLISHER_ID INTO p_id FROM PUBLISHER WHERE UPPER(PUBLISHER_NAME)= UPPER(p_name);
				INSERT INTO BOOK(BOOK_NAME, BOOK_GENRE, AUTHOR_ID, PUBLISHER_ID, LANGUAGE, SUMMARY, ISBN, PAGES, QUANTITY, EDITION, PRICE_PER_BOOK) VALUES(					b_name, b_genre, a_id, p_id, b_lang, b_summ, b_isbn, b_page, b_quantity, b_edition, b_price);	

				SELECT BOOK_ID INTO b_id FROM BOOK 
				WHERE UPPER(BOOK_NAME)= UPPER(b_name) AND UPPER(ISBN)= UPPER(b_isbn) AND UPPER(EDITION)= UPPER(b_edition); 
				FOR k IN 1..b_quantity 
				LOOP
				INSERT INTO BOOK_COPY(BOOK_ID, SHOP_ID) VALUES(b_id, s_id);
				END LOOP;
		WHEN TOO_MANY_ROWS THEN
				DBMS_OUTPUT.PUT_LINE('More than one row found.') ; 
		WHEN OTHERS THEN
				DBMS_OUTPUT.PUT_LINE('Some unknown error occurred.') ;
END;

DECLARE
BEGIN
		add_book(20021, 'Ami Topu', 'Teen, Novel', 'Md. Jafar Iqbal','OnnoProkash', 'Bangla', NULL, '1111112345', 120, 6, '3rd edition', 220);
END;
