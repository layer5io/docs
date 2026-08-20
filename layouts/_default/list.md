{{- .Title }}
{{ with .Description }}
> {{ . }}
{{ end }}
{{ .RawContent }}
{{ range .Pages }}
- [{{ .Title }}]({{ .Permalink }}){{ with .Description }}: {{ . }}{{ end }}
{{- end -}}
