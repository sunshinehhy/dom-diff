    <!-- 方法1 -->
     this.getEndCertificateFun().then(v => {
       console.log(v);
       this.getStudentWorkForCertificateFun().then(v => {
         console.log(v);
      });
    });
    <!-- 方法2 -->
    const serialFn = async () => {
      await this.getEndCertificateFun();
      await this.getStudentWorkForCertificateFun();
    };
    serialFn();
