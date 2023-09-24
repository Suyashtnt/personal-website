# treefmt.nix
{...}: {
  projectRootFile = "flake.nix";
  programs.alejandra.enable = true;
  # TODO: eslint
}
