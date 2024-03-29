## 数字图像处理及表示

### 人眼视觉

+ 锥状体对色彩敏感，杆状体对亮度敏感

+ **马赫带效应** 指在色带亮度变化的边界处感觉亮度比实际亮度要亮

![image-20230225140722242](https://s2.loli.net/2023/02/25/svM3jLRZnABh2Sk.png)

### 图像的采样和量化

+ 采样：对图像空间坐标`x,y`的离散化

+ 量化：对图像灰度离散化

+ **标准化**：通过灰度的平均值和标准差，将灰度值缩放成一个标准的正态分布，缩放后均值为0，方差为1

+ **归一化**：利用数据集每个灰度的最大值，最小值，将灰度值缩放到`[0,1]`区间

+ **二值化**：将图像灰度值转化为0和1两个值

+ JPEG 离散余弦编码

### 基本几何变换

平移、缩放、旋转、仿射、镜像

### 电磁波谱从高到低排列

γ 射线、X 射线、紫外线、可见光、红外线、无线电波

## 图像变换

空域图像转化为频率域图像

### 傅里叶变换

离散傅立叶变换

![image-20230225215842350](https://s2.loli.net/2023/02/25/7veZOgDpbtBmosy.png)

变换频谱结果是灰度图像

+ 平移性
+ 周期性
+ 共轭对称性
+ 旋转不变性
+ 卷积性

### 离散余弦变换（DCT）

能量集中在左上角

### 小波变换

每通过一次小波变换后，图像被分为四分之一的子频带区域，分别包含了相应频带的小波系数，LL频带是图像内容的缩略图，保持了原图的内容信息，LH频带含有水平方向的高频边缘信息，HL频带含有竖直方向的高频边缘信息，HH频带含有对角方向的高频边缘信息，反映了水平和竖直方向上图像灰度的综合变换。

![img](https://s2.loli.net/2023/02/25/fBOrDXSmY37UJi9.png)

+ 小波必须是振荡的
+ 小波的振幅只能在一个很短的一段区间上非零，也即是局部化的

## 空域增强

![image-20230225212226332](https://s2.loli.net/2023/02/25/qEhz3WgdS41Bser.png)

### 灰度级变换

#### 线性灰度变换

![image-20230225212429174](https://s2.loli.net/2023/02/25/uW982FvTEOUkaqp.png)

#### 分段线性灰度变换

#### 非线性灰度变换

##### 幂次变换

公式
$$
s = cr^{\gamma}
$$
其中，`c`和`γ`是正常数。

当`γ<1`，此时扩展低灰度级，压缩高灰度级，在正比函数上方，使图像变亮；

当`γ>1`，此时扩展高灰度级，压缩低灰度级，在正比函数下方，使图像变暗。

![在这里插入图片描述](https://s2.loli.net/2023/02/25/1qbEwlr8UfFIZ6i.png)

### 直方图

图像中各像素灰度值出现次数（或频数）的统计结果

+ 只反映该图像中不同灰度值出现的次数

+ 不反映每一灰度值像素所在位置

#### 直方图均衡化

直方图均衡化用于增强直方图呈均匀分布的图像

### 空域滤波

采用方式 模板运算和卷积运算

#### 噪声

+ 乘性噪声与加性噪声
  + 乘性噪声一般由信道不理想引起，它们与信号的关系是相乘，信号在它在，信号不在他也就不在。
  + 加性噪声一般指热噪声、散弹噪声等，它们与信号的关系是相加，不管有没有信号，噪声都存在。
+ 高斯噪声
+ 椒盐噪声 **随机噪声**

#### 领域运算（区域处理）

##### 图像平滑

随着核大小逐渐变大，会让图像变得更加模糊

核为（1,1）时，结果为原图，核的大小必定为**奇数**

+ 均值滤波

+ 中值滤波

  + 模板区域内的像素排序，求出中值

  + 非线性平滑滤波器

  + 消除噪声、保持图像细节
  + **对脉冲信号抑制较好**

+ 高斯滤波

##### 图像锐化

增强图像边缘

###### 交叉差分法 Roberts梯度法

## 频率域图像增强

![image-20230225211325731](https://s2.loli.net/2023/02/25/nXhdveGc9WLVHKl.png)

### 低通滤波

图像边缘及噪声的频率分量处于高频部分，因此可采用低频滤波去除噪声

#### 理想低通

![image-20230225211536553](https://s2.loli.net/2023/02/25/N794iFRryD5Lvdn.png)

![image-20230225211604375](https://s2.loli.net/2023/02/25/Df1s8PNCOItnYcq.png)

**振铃现象** 

![image-20230225211724440](https://s2.loli.net/2023/02/25/XbQpNJxRDeaTC19.png)

#### 巴特沃斯低通滤波器

高阶会出现**振铃现象**

### 高通滤波

+ 理想高通

+ 巴特沃斯高通

### 带通滤波

### 带阻滤波

### 同态滤波

## 图像复原

### 图像退化

运动模糊、离焦模糊、噪声干扰

退化病态问题：退化系统非线性、退化的逆变换不存在、逆变换不唯一

无退化病态问题的图像可以复原

### 图像恢复与图像增强

+ 相同点：都能够改进输入图像的视觉质量
+ 不同点：图像增强为了取得更好的视觉效果，图像退化是为了复原图像

### 无约束复原

#### 逆滤波

噪声的影响十分巨大

解决该问题的方法就是避开`H(u,v)`的零点及小数值的点

### 有约束复原

#### 维纳滤波

+ 前提 图像和噪声都是随机过程，图像和噪声不相关
+ 基本思想 找到原图像`f(x,y)`的一个估计值，使得估计值与原图像之间的均方误差在统计意义上最小
+ 在对图像复原过程中需要计算噪声功率谱和图像功率谱

#### 约束最小平方滤波

+ 了解关于退化系统的传递函数

+ 知道某些噪声的统计特性或噪声与图像的某些相关
+ 无须获知原图像的统计值

![image-20230225222421951](https://s2.loli.net/2023/02/25/LSNeuB9Qndz1FMj.png)

## 图像压缩

### 信息熵

变长编码的平均最短码长

### 图像冗余

+ 编码冗余

  编码符号数多于实际所需

+ 像素间冗余

  邻域像素间相关性

+ 心理视觉冗余

  视觉感知的重要程度

## 图像分割

### 基于区域间灰度不连续性

####  **边缘检测**

边缘检测算子

![image-20230225204342933](https://s2.loli.net/2023/02/25/RLIH7zVCKtsEAD3.png)

+ 一阶算子：Roberts算子、Sobel算子、Prewitt算子

+ 二阶算子：Laplacian算子 对噪声敏感

  **Roberts算子**利用局部差分算子寻找边缘，边缘定位精度较高，但容易丢失一部分边缘，不具备抑制噪声的能力。

  **Sobel算子**考虑了综合因素，对噪声较多的图像处理效果更好，Sobel算子边缘定位效果不错，但检测出的边缘容易出现多像素宽度。

  **Prewitt算子**对灰度渐变的图像边缘提取效果较好，而没有考虑相邻点的距离远近对当前像素点的影响，与Sobel算子类似。

  **Laplacian算子**对噪声非常敏感，它使噪声成分得到加强，由于其算法可能会出现双像素边界，常用来判断边缘像素位于图像的明区或暗区。

+ Canny算子

  抑制了噪声，错误率更低，定位准确

#### Hough变换

### 基于区域内灰度相似性

#### **阈值分割**

特点

+ 对物体和背景有较强对比有效

+ 计算简单

+ 能用封闭且连通的边界定义不交叠的区域

+ 可以推广到非灰度特征

阈值选取方式

+ **直方图谷底确认阈值（双峰法）**

+ **最大类间方差阈值**

  选择阈值，其分割能使得目标和背景区域之间的总体差别最大（两类数据间方差越大越好，同类数据间方差越小越好）

