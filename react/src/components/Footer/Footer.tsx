import { FC, useState, useEffect, FormEvent } from 'react';
import styles from './Footer.module.css';
import { Container, Row, Col } from 'react-bootstrap';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {

  useEffect(() => {

  }, []);

  return (
    <>
        <Container className={styles.footer} fluid>
            <Row>
                <Col className="">
                  <h3 className="fs-4 text-center">Business Hours</h3>
                  <table className={styles.hourstable}>
                      <tbody>
                          <tr className="py-5">
                              <td className="">Mon-Tues:</td>
                              <td className="px-3">CLOSED</td>
                          </tr>
                          <tr className="py-5">
                              <td className="">Wed-Fri:</td>
                              <td className="px-3">12:00pm - 7:00pm</td>
                          </tr>
                          <tr className="py-5">
                              <td className="">Saturday:</td>
                              <td className="px-3">12:00pm - 6:00pm</td>
                          </tr>
                          <tr className="py-5">
                              <td className="">Sunday:</td>
                              <td className="px-3">12:00pm - 5:00pm</td>
                          </tr>
                      </tbody>
                  </table>
                </Col>
                <Col className='text-center'>
                  <h3 className="fs-4">Address</h3>
                  <p className="fs-6 fw-normal">
                    4385 Sheppard Ave E, Unit 12 <br></br>
                    Toronto, Ontario, Canada</p>
                </Col>
            </Row>
            <div className={styles.copyright}>
                © Copyright retrogamebros  
            </div>
        </Container>
    </>
  );
};

export default Footer;
