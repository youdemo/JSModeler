Viktor Kovacs最近开发了JSModeler，这是一款使用WebGL渲染进行可视化3D建模的Javascript API，它非常易于使用。该工具基于three.js框架构建。其库中包括了各种实例，其中包括
乐高玩具生成器  http://kovacsv.github.io/JSModeler/documentation/examples/robot/robot.html

、3D的井字游戏http://kovacsv.github.io/JSModeler/documentation/examples/tictactoe.html

和机械臂。http://kovacsv.github.io/JSModeler/documentation/examples/legobuilder.html

该类库具有如下功能：
简单的3D手动建模或者使用生成器建模 
我们可以通过手工添加顶点和多边型的方法建模。 
我们可以使用内置生成器功能创建基本形状（长方体、球体、圆柱体、圆锥体、圆环、圆环多边形、棱镜、棱镜壳、线壳、直纹面、旋转曲面、柏拉图和阿基米德固体、功能表面）。 
内置基于Three.js的模型浏览器，带有旋转和放大功能。 
自动转换为Three.js几何格式。 
在转换中凸和凹多边形会自动转换为三角形。 
自动计算曲面的多边形顶点法线。 
对2D和3D多边形做多边形三角化。 
大量的2D和3D几何功能。 
自动转换为STL文件格式 
在指引手册对相关基础知识做了解析。以下是一些基本概念：
Bodies，指的是出现在可视化建模中的对象。Bodies是由以下形状构建而成：
顶点：在一个三维空间中的点 
多边形：连接一系列顶点数目的表面 
曲线组：由多个多边形组合成一个弯曲的形状。 
材质：定义了多边形的颜色。 
变换：变换bodies比如转移它们的位置或进行旋转。 
内置各种形状的生成器（长方体、球体、圆柱体、圆锥体、棱镜等） 
JSModeler目前可以在Github上获得，并且附有大量例子帮助用户入门。
查看英文原文：3D Modeling Made Easy with JSModeler
