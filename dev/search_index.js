var documenterSearchIndex = {"docs":
[{"location":"api/#API/Reference","page":"API/Reference","title":"API/Reference","text":"","category":"section"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"using PSFModels: Gaussian, Moffat, AiryDisk\nusing Plots","category":"page"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"","category":"page"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"PSFModels.PSFModel\nPSFModels.ScaledPSFModel","category":"page"},{"location":"api/#PSFModels.PSFModel","page":"API/Reference","title":"PSFModels.PSFModel","text":"PSFModels.PSFModel{T} <: AbstractMatrix{T}\n\nAbstract type for PSF models.\n\nIn general, all PSFModels have a set of pre-determined axes (the size is set upon creation) but they are lazy. That is, no memory is allocated and the values are calculated on the fly.\n\nInterface\n\nThe interface to define a model is as follows (for an example model Model)\n\nmethod description\nModel() constructor(s)\nBase.size(m::Model) size, necessary for AbstractArray interface\nBase.axes(m::Model) axes, necessary for AbstractArray interface\n(m::Model)(point::AbstractVector) evaluate the model at the point in 2d space (x, y)\n\nbrowsing through the implementation of PSFModels.Gaussian should give a good idea of how to create a model\n\n\n\n\n\n","category":"type"},{"location":"api/#PSFModels.ScaledPSFModel","page":"API/Reference","title":"PSFModels.ScaledPSFModel","text":"PSFModels.ScaledPSFModel(amp, model)\n\nA lazy wrapper for a PSFModel that adds the scalar amplitude amp to the given model. This is convenient to avoid broadcasting and materializing an array from a PSFModel because the scalar multiplication can be chained to the original model's output.\n\nExamples\n\njulia> g = PSFModels.Gaussian(10);\n\njulia> g(0, 0)\n1.0\n\njulia> m1 = 20 * g; # construct implicitly using scalar * or /\n\njulia> m1(0, 0)\n20.0\n\njulia> maximum(g / 100) # scalar division works, too\n0.01\n\njulia> m2 = PSFModels.ScaledPSFModel(20, g); # construct explicitly\n\njulia> m1 == m2\ntrue\n\n\n\n\n\n","category":"type"},{"location":"api/#Gaussian","page":"API/Reference","title":"Gaussian","text":"","category":"section"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"PSFModels.Gaussian\nPSFModels.Normal","category":"page"},{"location":"api/#PSFModels.Gaussian","page":"API/Reference","title":"PSFModels.Gaussian","text":"PSFModels.Gaussian(fwhm; maxsize=3)\nPSFModels.Gaussian(position, fwhm; maxsize=3)\nPSFModels.Gaussian(x, y, fwhm; maxsize=3)\nPSFModels.Gaussian(::Polar, fwhm; maxsize=3, origin=(0, 0))\nPSFModels.Gaussian{T}(args...; kwargs...)\n\nAn unnormalized bivariate Gaussian distribution. The position can be specified in (x, y) coordinates as a Tuple, AbstractVector, or as separate arguments. By default the model is placed at the origin. The position can also be given as a CoordinateTransformations.Polar, optionally centered around origin.\n\nThe fwhm can be a scalar (isotropic), vector/tuple (diagonal), or a matrix (correlated). For efficient calculations, we recommend using StaticArrays. Here, maxsize is a multiple of the fwhm, and can be given as a scalar or as a tuple for each axis.\n\nThe output type can be specified, and will default to Float64. The amplitude is unnormalized, meaning the maximum value will always be 1. This is distinct from the probability distribution (pdf) of a bivariate Gaussian which assures the model sums to 1. This means the models act like a transmission weighting instead of a probability weighting.\n\nFunctional form\n\nf(x | x̂, FWHM) = exp[-4ln(2) * ||x - x̂|| / FWHM^2]\n\nwhere x̂ and x are position vectors (indices) ||⋅|| represents the square-distance, and FWHM is the full width at half-maximum. If FWHM is a vector or tuple, the weighting is applied along each axis.\n\nIf the FWHM is a correlated matrix, the functional form uses the square-Mahalanobis distance\n\nf(x | x̂, Q) = exp[-4ln(2) * (x - x̂)ᵀ Q (x - x̂)]\n\nwhere Q is the inverse covariance matrix (or precision matrix). This is equivalent to the inverse of the FWHM matrix after squaring each element.\n\n\n\n\n\n","category":"type"},{"location":"api/#PSFModels.Normal","page":"API/Reference","title":"PSFModels.Normal","text":"PSFModels.Normal\n\nAn alias for PSFModels.Gaussian\n\n\n\n\n\n","category":"type"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"model = Gaussian(10)\nplot(model; title=\"Gaussian(fwhm=10)\")","category":"page"},{"location":"api/#Airy-Disk","page":"API/Reference","title":"Airy Disk","text":"","category":"section"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"PSFModels.AiryDisk","category":"page"},{"location":"api/#PSFModels.AiryDisk","page":"API/Reference","title":"PSFModels.AiryDisk","text":"PSFModels.AiryDisk(fwhm; maxsize=3)\nPSFModels.AiryDisk(position, fwhm; maxsize=3)\nPSFModels.AiryDisk(x, y, fwhm; maxsize=3)\nPSFModels.AiryDisk(::Polar, fwhm; maxsize=3, origin=(0, 0))\nPSFModels.AiryDisk{T}(args...; kwargs...)\n\nAn unnormalized Airy disk. The position can be specified in (x, y) coordinates as a Tuple, AbstractVector, or as separate arguments. By default the model is placed at the origin. The position can also be given as a CoordinateTransformations.Polar, optionally centered around origin.\n\nThe fwhm can be a scalar (isotropic) or vector/tuple (diagonal). For efficient calculations, we recommend using StaticArrays. Here, maxsize is a multiple of the fwhm, and can be given as a scalar or as a tuple for each axis.\n\nThe output type can be specified, and will default to Float64. The amplitude is unnormalized, meaning the maximum value will always be 1. This means the models act like a transmission weighting.\n\nFunctional form\n\nThe Airy disk is a distribution over the radius r (the square-Euclidean distance)\n\nf(x | x̂, FWHM) = [ 2J₁(q) / q ]^2\n\nwhere J₁ is the first order Bessel function of the first kind and\n\nq ≈ π * r / (0.973 * FWHM)\n\n\n\n\n\n","category":"type"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"model = AiryDisk(10)\nplot(model; title=\"AiryDisk(fwhm=10)\")","category":"page"},{"location":"api/#Moffat","page":"API/Reference","title":"Moffat","text":"","category":"section"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"PSFModels.Moffat","category":"page"},{"location":"api/#PSFModels.Moffat","page":"API/Reference","title":"PSFModels.Moffat","text":"PSFModels.Moffat(fwhm; maxsize=3)\nPSFModels.Moffat(position, fwhm; maxsize=3)\nPSFModels.Moffat(x, y, fwhm; maxsize=3)\nPSFModels.Moffat(::Polar, fwhm; maxsize=3, origin=(0, 0))\nPSFModels.Moffat{T}(args...; kwargs...)\n\nAn unnormalized Airy disk. The position can be specified in (x, y) coordinates as a Tuple, AbstractVector, or as separate arguments. By default the model is placed at the origin. The position can also be given as a CoordinateTransformations.Polar, optionally centered around origin.\n\nThe fwhm can be a scalar (isotropic) or vector/tuple (diagonal). For efficient calculations, we recommend using StaticArrays. Here, maxsize is a multiple of the fwhm, and can be given as a scalar or as a tuple for each axis.\n\nThe output type can be specified, and will default to Float64. The amplitude is unnormalized, meaning the maximum value will always be 1. This means the models act like a transmission weighting.\n\nFunctional form\n\nf(x | x̂, FWHM) = 1 / [1 + ||x - x̂|| / (FWHM / 2)^2]\n\nwhere x̂ and x are position vectors (indices) ||⋅|| represents the square-distance, and FWHM is the full width at half-maximum. If FWHM is a vector or tuple, the weighting is applied along each axis.\n\n\n\n\n\n","category":"type"},{"location":"api/","page":"API/Reference","title":"API/Reference","text":"model = Moffat(10)\nplot(model; title=\"Moffat(fwhm=10)\")","category":"page"},{"location":"examples/#Examples","page":"Examples","title":"Examples","text":"","category":"section"},{"location":"examples/#Fitting-a-PSF","page":"Examples","title":"Fitting a PSF","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"Here is a brief example which shows how to construct a loss function for fitting a PSFModel to some data.","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using PSFModels: Gaussian\nusing HCIDatasets: BetaPictoris\nusing Plots\n\n# convenience function for plotting\nfunction imshow(data; kwargs...)\n    xlim = extrema(axes(data, 2))\n    ylim = extrema(axes(data, 1))\n    heatmap(data; xlim=xlim, ylim=ylim, aspect_ratio=1, kwargs...)\nend\n\n# get a PSF from HCIDatasets.jl;\n# you may be prompted to download the file\npsf = BetaPictoris[:psf]\n\nimshow(psf)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using LossFunctions\n\n# generative model\nfunction model(X::AbstractVector{T}) where T\n    position = @view X[1:2] # x, y position\n    fwhm     = @view X[3:4] # fwhm_x, fwhm_y\n    amp      =       X[5]   # amplitude\n    return amp * Gaussian{T}(position, fwhm)\nend\n\n# objective function\nfunction loss(X::AbstractVector{T}, target) where T\n    # cheap way to enforce positivity\n    all(>(0), X) || return T(Inf)\n    # get generative model\n    m = model(X)\n    # l2-distance loss (χ² loss) (LossFunctions.jl)\n    stamp = @view m[axes(target)...]\n    return value(L2DistLoss(), target, stamp, AggMode.Sum())\nend\n\n# params are [x, y, fwhm_x, fwhm_y, amp]\ntest_params = Float32[20, 20, 5, 5, 1]\nloss(test_params, psf)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"The objective function can then be used with an optimization library like Optim.jl to find best-fitting parameters","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"using Optim\n\n# Fit our data using test_params as a starting point\n# uses Nelder-Mead optimization\nres = optimize(P -> loss(P, psf), test_params)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"# utilize automatic differentiation (AD) to enable\n# advanced algorithms, like LBFGS\nres_ad = optimize(P -> loss(P, psf), test_params, LBFGS(); autodiff=:forward)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"we can see which result has the better loss, and then use the generative model to create a model that we can use elsewhere","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"best_res = minimum(res) < minimum(res_ad) ? res : res_ad\nbest_fit_params = Optim.minimizer(best_res)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"synth_psf = model(best_fit_params)\n\nplot(\n    imshow(psf, title=\"Data\"),\n    plot(synth_psf, axes(psf); title=\"Model\"),\n    cbar=false,\n    ticks=false,\n    layout=2,\n    size=(600, 300)\n)","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = PSFModels","category":"page"},{"location":"#PSFModels.jl","page":"Home","title":"PSFModels.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: GitHub) (Image: Build Status) (Image: PkgEval) (Image: Coverage) (Image: License)","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"PSFModels can be added from the Julia package manager","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia>]\n\n(@v1.6) pkg> add PSFModels","category":"page"},{"location":"#Getting-Started","page":"Home","title":"Getting Started","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To import the library","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> using PSFModels","category":"page"},{"location":"","page":"Home","title":"Home","text":"None of the models are exported to avoid namespace clashes, but it can be verbose. You can either import names directly","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> using PSFModels: Gaussian\n\njulia> model = Gaussian(8)","category":"page"},{"location":"","page":"Home","title":"Home","text":"or you can create an alias for PSFModels","category":"page"},{"location":"","page":"Home","title":"Home","text":"# julia version 1.5 or below\nusing PSFModels\nconst M = PSFModels\n# julia version 1.6 or above\nusing PSFModels as M\n\nmodel = M.Gaussian(10)","category":"page"},{"location":"","page":"Home","title":"Home","text":"PSFModels","category":"page"},{"location":"#PSFModels.PSFModels","page":"Home","title":"PSFModels.PSFModels","text":"PSFModels\n\nStatistical models for constructing point-spread functions (PSFs). These models act like matrices but without allocating any memory, which makes them efficient to fit and apply.\n\nModels\n\nThe following models are currently implemented\n\nPSFModels.Gaussian\nPSFModels.AiryDisk\nPSFModels.Moffat\n\nParameters\n\nIn general, the PSFs have a position, a full-width at half-maximum (FWHM) measure, and an amplitude. The position a 1-based pixel coordinate system, where (1, 1) represents the center of the bottom left pixel. This matches the indexing style of Julia as well as DS9, IRAF, SourceExtractor, and WCS. If a position is not specified, it is set to (0, 0). The FWHM is a consistent scale parameter for the models. All models support a scalar (isotropic) FWHM and a FWHM for each axis (diagonal).\n\nUsage\n\nUsing the models should feel just like an array. In fact, PSFModels.PSFModel <: AbstractMatrix. However, no data is stored and no allocations have to be made. In other words, representing the models as matrices is merely a convenience, since typically astronomical data is stored in dense arrays.\n\njulia> m = PSFModels.Gaussian(5); # fwhm of 5 pixels, centered at (0, 0)\n\njulia> m[0, 0] # [y, x] for indexing\n1.0\n\nTo control the amplitude, the best method is using scalar multiplication or division. These operations create another lazy object (ScaledPSFModel) that scales the original model without having to broadcast and potentially allocate.\n\njulia> m_scaled = 20 * m;\n\njulia> m_scaled(0, 0)\n20.0\n\njulia> m′ = m_scaled / 20;\n\njulia> m′(0, 0)\n1.0\n\nBecause the model is a matrix, it needs to have a size. In this case, the size is maxsize * FWHM pixels, centered around the origin, and rounded up. We can see how this alters the indices from a typical Matrix\n\njulia> size(m)\n(17, 17)\n\njulia> axes(m)\n(-8:8, -8:8)\n\nif we want to collect the model into a dense matrix, regardless of the indexing (e.g. to prepare for cross-correlation), we can simply\n\njulia> stamp = collect(m);\n\nthese axes are merely a convenience for bounding the model, since they accept any real number as input. \n\njulia> m[100, 10000] # index-like inputs [y, x]\n0.0\n\njulia> m(2.4, 1.7) # valid for any real (x, y)\n0.38315499005194587\n\nBy bounding the model, we get a cutout which can be applied to arrays with much larger dimensions without having to iterate over the whole matrix\n\njulia> big_mat = ones(101, 101);\n\njulia> model = PSFModels.Gaussian(51, 51, 2); # center of big_mat, fwhm=2\n\njulia> ax = map(intersect, axes(big_mat), axes(model))\n(48:54, 48:54)\n\njulia> cutout = @view big_mat[ax...]\n7×7 Array{Float64,2}:\n 1.0  1.0  1.0  1.0  1.0  1.0  1.0\n 1.0  1.0  1.0  1.0  1.0  1.0  1.0\n 1.0  1.0  1.0  1.0  1.0  1.0  1.0\n 1.0  1.0  1.0  1.0  1.0  1.0  1.0\n 1.0  1.0  1.0  1.0  1.0  1.0  1.0\n 1.0  1.0  1.0  1.0  1.0  1.0  1.0\n 1.0  1.0  1.0  1.0  1.0  1.0  1.0\n\njulia> stamp = @view model[ax...];\n\njulia> photsum = sum(cutout .* stamp)\n4.5322418212890625\n\nNice- we only had to reduce ~50 pixels instead of ~10,000 to calculate the aperture sum, all in under a microsecond (on my machine).\n\nSince the models are lazy, that means the type of the output can be specified, as long as it can be converted to from a real number (so no integer types).\n\njulia> mbig = PSFModels.Gaussian{BigFloat}(12);\n\njulia> sum(mbig)\n163.07467408408593790971336380361822460116627553361468017101287841796875\n\nfinally, we provide plotting recipes from RecipesBase.jl, which can be seen in use in the API/Reference section.\n\nusing Plots\nmodel = PSFModels.Gaussian(8)\nplot(model)              # default axes\nplot(model, 1:5, 1:5)    # custom axes\nplot(model, axes(other)) # use axes from other array\n\ntip: Tip: Automatic Differentation\nForward-mode AD libraries tend to use dual numbers, which can cause headaches getting the types correct. We recommend using the primal vector's element type to avoid these headaches# example generative model for position and scalar fwhm\nmodel(X::AbstractVector{T}) where {T} = PSFModels.Gaussian{T}(X...)\n\n\n\n\n\n","category":"module"}]
}
