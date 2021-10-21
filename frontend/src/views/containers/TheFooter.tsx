import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TheFooter extends React.Component<RouteComponentProps<{}>> {
	render() {
		return (
			<footer>
				<div className="footer__container">
					<div className="footer-top footer-padding">
						<div className="row d-flex justify-content-between">
							<div className="col-xl-4 col-lg-4 col-md-5 col-sm-8">
								<div className="single-footer-caption mb-50">
									<div className="footer-logo">
										<a href="index.html">
											<img
												src="data:image/webp;base64,UklGRs4HAABXRUJQVlA4TMIHAAAvg0AUEA+noG0bxijHn8sfg/kPAklbePdkEc6EjQACQJgIIAIRkgAQABCBUAkHAuFI4AAndAIATgBA6ISd8Iata9sWt61eWa5aKWrVMDPzuMxhVBwGhTkZlXnCDKbGEGYlitvuHVDK3E4Y5U6YTM9fsb/v/T6P5qhHEf13IElS2+weckYDIso/IA/7mXFB8pB7fLZhjpHlPm27FSHykCMPAODf1S1dpn2tJETUshl5xU+n6wXcW5LtJuysvSGigROoFXnFgysh+kx310gD2w8EiEbMo0ktyDMeUyPF/YkucbYor08Ll5HZm6iRZ84xUQ5scuVb/S8UZ5N/S9y38g2iyHTyjGfIwrHGDWfMfVjsp0YHTN/WcUSRDc+QdzyHiV/bNhAw63PUpVap2b5ti4giu1qRlxxn4lLvBuE9dxBFfup9frZ/x1qiSHIAecsfM/HvKw2A6/gbtvno7duz/cXFPmp6ajR5zRYTD98WSVq9NGrCtIULp00Y9ZJ4qY3r9WnKo1n+4kSAmv8cJ+95CxejX1tS9vtjsH78e9mSZQ/qku+T6onZxd89V5d2kAfty4PC9385lL/+0/fe+3R9/qFf7gsoVxf2Kq2ZGDhgt6xL3wbIi/YXM5/Vlg5T9rRWVi2qAOCrFgfS3erSuWZE3ozjTFSOUDLlPAE2LLpbC9RUT6K2f97pTd60sZ99r/IdVQP5SaQZOegSgKOXaoaQJ91xL1DxwddcZm/xVINEmLzQESyMO8CPHcmDDn70CDcWhiiUZOLOiyzXSumqnMMq6noFD/HooyB5zTl/oWpNhIgodJKJ2305sN0yTFWwbxo7m6ypwl85HusD71ehvKcEETnNxOUODBpXI2fv4niAqGc5qt73k3fcshxPlnEL2chZyL61b38yub9087Lx98H5tHChspY9QXlL8ooHXMIf/XiQ5j9D9j9j3npr2Ji5K06w6VRE4uv3By55ZbIceg+HIwqSFwqqIXufT0Ap4lJJiLtSh3FvKHnBuZVYwTen7Anf//3hy/9A9hdERKMYjHursvkGvAKVud5YPs5nMbImnz8xzEfUlovhRC8/BFCVjI8wnh124vxkfg80HzUTKdMeVYPZ/G7lu1OvCwRsOO1fvANgh7x0f/3Ud6+xqLNRM4oy69cfIcZRhDdezfURqeOn+rSUnS5yr24McxgxPHqdMukuFfiEXaf/U9SEhep6GYxrJit4mxT905+j+AQVXTI5L/yMQh9DMS09Ub1glFNVVKP5pqdx16MQP2dwvijAyaeYAnz+dy81V+S43Ak7aTD3+vtzptqeOokCypQnoaId07mLTjbX2kvKw9EPz2owNT9Z5Gf2/hWYRJlx6zsYwq3ckiFNuCNSHAloIIWSxUwMwZ3WlBHvRj7DsFU3Df7Sv7pWjANBrdjKMORjD2XCI3CFmRmWfx/WQxtZiSPPv3pNjP811eAKf7+cabJXMILcd+A8RjHVcLmd/g784avU9nsx/tTJrN1lpsCjcD4Dy/t5SDIluPmSHtnsGmmX1Ug6480XNNheusnUWhLzyG2HryFHzqH8XT2ypdxGL3BAjIcjNejeLZczyMG1MLns5dglIywo17oP51sFoHKofJsqKQ3T89V8WeULZIRdWE7uOvsi+ssnTffSHZD4rU1YXleu9avHyLR81v64lE2uehz3efHnOliNkwBqxrIkzeSZc4968Pi8mPt4HLnqbzBcIuh9U6f19BEKOlV189SR4v/KcTx8U97oDcc37s7TuCi3vb2LNajGCuvmuJLmzUop7G4qoEV75DZ5Ea7O23GslBcG6aC6iYq7qG0605okpFXnDaa7MvsvV2+EnIW8DF9nKZFai5vMY1rN+gs5HqrWz9Y6eWOAs+Seg+s/Y+48tVGeMr6+3msaa+H6PlgvebXiB20+lgk+Wx+k/46cB8CUcsog/CAAttuoUQAwGyL+5qCdac1ZqDKzP98JADu9qQHKos4pgsoLZVRHwGjsSS2EykVdq5XiXwOxBkjRKDOr6q5UrKs8gHnpdRUT9a5Vinmd2gk4jd2TYQGAZehRmA5gaau2NxGV6ake1DQBRF1TTAY3dSgSAoKtqzJhFtWTBcDoLLx04yt5RFGOIqqmMGUKTYkDwH4t2YBDlAIct5QSchJgbDWFI1A0TmhqPwl+Q0cGAEv8edQdGdL40dgBYOhS6L79BvcXmUJMfkJ22lJARAGk5CYX06PQV1xc7FboKMWBOO4oBiDBlFaLogGqCHMoChk8yaCMHjSkW9DgNR2ZPInligxIQ5jU8jQoGqJrQaK50FFKnqEaC7wuyI2fmUQ7tcfnuRS4qKPOAFJcmQwXlNlxCRcDM6EhAdYipmNamR6f5Z6VcrTn65nHzqs8TWrCUa5ebXdEhinPU0oKpjJTkqYpi3qM/ks2Yg0HM8lTjgFAQk+DHOQx48POxiKkZ9WZiPS0M2GgsyCbOttiNZCnZdhwBlEMSHWmBGxBppNIkKQ6CILtxECw4Rh1iiImYHroxaBUgiynMUxK7YxiUGdBMTjECQSL6mWRnUewHIvqYU0vHWDSIMQwiEzbhPjCgGnvTFjswRQUo0SdgMY0KAVnkJekOBjCIYqo4cDg3lbIslPkmGTnefdtx4mJ3dCGxf1MIbOzkxcDbMOFghE="
												alt=""
												data-pagespeed-url-hash="220807005"
											/>
										</a>
									</div>
								</div>
							</div>
							<div className="col-xl-2 col-lg-2 col-md-5 col-sm-6">
								<div className="single-footer-caption mb-50">
									<div className="footer-tittle">
										<h4>Navigation</h4>
										<ul>
											<li>
												<a href="#">Home</a>
											</li>
											<li>
												<a href="#">Events</a>
											</li>
											<li>
												<a href="#">Testimonial</a>
											</li>
											<li>
												<a href="#">Categories</a>
											</li>
											<li>
												<a href="#">Contacts</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-xl-2 col-lg-2 col-md-5 col-sm-6">
								<div className="single-footer-caption mb-50">
									<div className="footer-tittle">
										<h4>Useful Links</h4>
										<ul>
											<li>
												<a href="#">Registration</a>
											</li>
											<li>
												<a href="#">Login</a>
											</li>
											<li>
												<a href="#">Policy</a>
											</li>
											<li>
												<a href="#">
													Terms &amp; Conditions
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className="col-xl-4 col-lg-4 col-md-5 col-sm-7">
								<div className="single-footer-caption mb-50">
									<div className="footer-tittle">
										<h4>Instagram Feed</h4>
									</div>
									<div className="instagram-gellay">
										<ul className="insta-feed">
											<li>
												<a href="#">
													<img
														src="assets/img/gallery/xinstagram1.png.pagespeed.ic.ljVxX_L8YD.webp"
														alt=""
														data-pagespeed-url-hash="916830776"
													/>
												</a>
											</li>
											<li>
												<a href="#">
													<img
														src="assets/img/gallery/xinstagram2.png.pagespeed.ic.zkqvKwx60s.webp"
														alt=""
														data-pagespeed-url-hash="1211330697"
													/>
												</a>
											</li>
											<li>
												<a href="#">
													<img
														src="assets/img/gallery/xinstagram3.png.pagespeed.ic.Grlow1jndg.webp"
														alt=""
														data-pagespeed-url-hash="1505830618"
													/>
												</a>
											</li>
											<li>
												<a href="#">
													<img
														src="assets/img/gallery/xinstagram4.png.pagespeed.ic.GuS4bh2__J.webp"
														alt=""
														data-pagespeed-url-hash="1800330539"
													/>
												</a>
											</li>
											<li>
												<a href="#">
													<img
														src="assets/img/gallery/xinstagram5.png.pagespeed.ic.Mq5pJ8jteN.webp"
														alt=""
														data-pagespeed-url-hash="2094830460"
													/>
												</a>
											</li>
											<li>
												<a href="#">
													<img
														src="assets/img/gallery/xinstagram6.png.pagespeed.ic.MS04xptdtH.webp"
														alt=""
														data-pagespeed-url-hash="2389330381"
													/>
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-bottom">
						<div className="row d-flex justify-content-between align-items-center">
							<div className="col-xl-9 col-lg-8">
								<div className="footer-copy-right">
									<p>
										Copyright ©
										<script>
											document.write(new
											Date().getFullYear());
										</script>
										2021 All rights reserved | This template
										is made with{" "}
										<i
											className="fa fa-heart"
											aria-hidden="true"
										></i>{" "}
										by{" "}
										<a
											href="https://colorlib.com"
											target="_blank"
										>
											Colorlib
										</a>
									</p>
								</div>
							</div>
							<div className="col-xl-3 col-lg-4">
								<div className="footer-social f-right">
									<span>Follow Us</span>
									<a href="#">
										<i className="fab fa-twitter"></i>
									</a>
									<a href="https://www.facebook.com/sai4ull">
										<i className="fab fa-facebook-f"></i>
									</a>
									<a href="#">
										<i className="fas fa-globe"></i>
									</a>
									<a href="#">
										<i className="fab fa-instagram"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default TheFooter;
