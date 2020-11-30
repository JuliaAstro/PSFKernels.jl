
# Examples

## Fitting a PSF

Here is a brief example which shows how to construct a loss function for fitting a `PSFKernel` to some data.

```@example fit
using PSFKernels: Gaussian
using HCIDatasets: BetaPictoris
using Plots

# convenience function for plotting
function imshow(data; kwargs...)
    xlim = extrema(axes(data, 2))
    ylim = extrema(axes(data, 1))
    heatmap(data; xlim=xlim, ylim=ylim, aspect_ratio=1, kwargs...)
end

# get a PSF from HCIDatasets.jl;
# you may be prompted to download the file
psf = BetaPictoris[:psf]

imshow(psf)
```

```@example fit
# generative model
function kernel(X::AbstractVector{T}) where T
    position = X[1:2] # x, y position
    fwhm     = X[3:4] # fwhm_x, fwhm_y
    return Gaussian{T}(position, fwhm)
end

# objective function
function loss(X::AbstractVector, target)
    k = kernel(X)
    amp = X[5]
    # l2-distance loss (χ² loss)
    return sum(abs2, target .- amp .* k[axes(target)...])
end

# params are [x, y, fwhm_x, fwhm_y, amp]
test_params = Float32[20, 20, 5, 5, 1]
loss(test_params, psf)
```

The objective function can then be used with an optimization library like [Optim.jl](https://github.com/JuliaOpt/Optim.jl) to find best-fitting parameters

```@example fit
using Optim

# Fit our data using test_params as a starting point
# uses Nelder-Mead optimization
res = optimize(P -> loss(P, psf), test_params)
```

```@example fit
# utilize automatic differentiation (AD) to enable
# advanced algorithms, like Newton's method
res_ad = optimize(P -> loss(P, psf), test_params, Newton(); autodiff=:forward)
```

we can see which result has the better loss, and then use the generative model to create a kernel that we can use elsewhere

```@example fit
best_res = minimum(res) < minimum(res_ad) ? res : res_ad
best_fit_params = Optim.minimizer(best_res)
```

```@example fit
model = kernel(best_fit_params)

plot(
    imshow(psf, title="Data"),
    imshow(model[axes(psf)...]; title="Model"),
    cbar=false,
    ticks=false,
    layout=2,
    size=(600, 300)
)
```