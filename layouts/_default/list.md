# {{ .Title }}
{{ with .Description }}
> {{ . }}
{{ end }}
{{ .RawContent }}
{{ range .Pages }}
- [{{ .Title }}]({{ with .OutputFormats.Get "markdown" }}{{ .RelPermalink }}{{ end }}){{ with .Description }}: {{ . }}{{ end }}
{{- end -}}
